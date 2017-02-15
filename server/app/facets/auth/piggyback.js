import * as authUtils from '../../lib/auth-utils';
import * as authView from './auth-view';
import deepExtend from 'deep-extend';
import {piggybackAsUser} from '../operations/piggyback';
import querystring from 'querystring';
import {disableCache} from '../../lib/caching';
import translateError from './translate-error';

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
 * @returns {SignInViewContext}
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

function assembleView(context, request, reply) {
	const response = reply.view(
		`auth/${authView.getViewType(request)}/piggyback`,
		context,
		{
			layout: 'card'
		}
	);

	disableCache(response);
	return response;
}

/**
 * @param {Hapi.Request} request
 * @param {*} reply
 * @returns {void}
 */
export function get(request, reply) {
	if (request.auth.isAuthenticated) {
		const context = getViewContext(request);
		return assembleView(context, request, reply);
	} else {
		return reply.redirect(authUtils.getSignInUrl(request)).takeover();
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

	return piggybackAsUser(username, password, targetUsername, request)
		.then(data => {
			const accessToken = JSON.parse(data.payload).access_token;
			if (accessToken && accessToken.length) {
				reply.state('access_token', accessToken);
			}
			reply({
				payload: data.payload
			}).code(200);
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
			}).code(data.response ? data.response.statusCode : 500);
		});
}
