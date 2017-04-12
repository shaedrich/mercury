import * as authUtils from '../../lib/auth-utils';
import * as authView from './auth-view';
import deepExtend from 'deep-extend';
import {piggybackAsUser} from '../operations/piggyback';
import querystring from 'querystring';
import translateError from './translate-error';
import HttpStatus from 'http-status-codes';
import {setUrlQuery} from '../../lib/url-utils';

/**
 * @typedef {Object} SignInViewContext
 * @extends AuthViewContext
 * @property {string} headerText
 * @property {string} [headerSlogan]
 * @property {string} [forgotPasswordHref]
 * @property {string} signinPostURL
 * @property {string} facebookSignInURL
 */

/**
 * @param {Hapi.Request} request
 * @returns {AuthViewContext}
 */
function getViewContext(request) {
	return deepExtend(authView.getDefaultContext(request),
		{
			title: 'auth:piggyback.header',
			headerText: 'auth:piggyback.header',
			pageType: 'piggyback',
			piggybackPostURL: '/piggyback',
			submitText: 'auth:signin.submit-text',
			formId: 'piggybackForm',
		}
	);
}

function getSignInUrlWithRedirectBackToPiggyback(request) {
	const signInUrl = authUtils.getSignInUrl(request);
	return setUrlQuery(signInUrl, {redirect: request.url.format()});
}

/**
 * @param {Hapi.Request} request
 * @param {*} reply
 * @returns {Hapi.Response}
 */
export function get(request, reply) {
	if (!request.auth.isAuthenticated) {
		const signInUrl = getSignInUrlWithRedirectBackToPiggyback(request);
		return reply.redirect(signInUrl).takeover();
	} else {
		const context = getViewContext(request);
		return authView.view('piggyback', context, request, reply, 'card');
	}
}

/**
 * @param {Hapi.Request} request
 * @param {*} reply
 * @returns {void}
 */
export function post(request, reply) {
	const username = querystring.escape(request.payload.username),
		password = querystring.escape(request.payload.password),
		targetUsername = querystring.escape(request.payload.targetUsername);

	piggybackAsUser(username, password, targetUsername, request)
		.then(data => {
			const accessToken = JSON.parse(data.payload).access_token;
			if (accessToken && accessToken.length) {
				reply.state('access_token', accessToken);
			}
			reply({payload: data.payload}).code(HttpStatus.OK);
		}).catch(data => {
			const errors = translateError(data, (error) => {
				let errorHandler = 'server-error';

				if (error.description === 'user_is_blocked') {
					errorHandler = 'username_blocked';
				} else if (error.description === 'user_doesnt_exist') {
					errorHandler = 'username-not-recognized';
				}

				return errorHandler;
			});

			reply({
				errors,
			}).code(data.response ? data.response.statusCode : HttpStatus.INTERNAL_SERVER_ERROR);
		});
}
