import * as authUtils from '../../lib/auth-utils';
import settings from '../../../config/settings';
import * as authView from './auth-view';
import deepExtend from 'deep-extend';
import HttpStatus from 'http-status-codes';
import querystring from 'querystring';
import translateError from './translate-error';
import {signinUser, signinFacebookUser} from '../operations/signin';

/**
 * @typedef {Object} SignInViewContext
 * @extends AuthViewContext
 * @property {string} headerText
 * @property {string} [headerSlogan]
 * @property {string} [forgotPasswordHref]
 * @property {string} signinPostURL
 * @property {string} signinFacebookURL
 */

/**
 * @param {Hapi.Request} request
 * @returns {SignInViewContext}
 */
function getSignInViewContext(request) {
	return deepExtend(authView.getDefaultContext(request),
		{
			title: 'auth:signin.signin-title',
			headerText: 'auth:signin.welcome-back',
			headerCallout: 'auth:signin.register-callout',
			headerCalloutLink: 'auth:signin.register-now',
			headerHref: authUtils.getRegisterUrl(request),
			forgotPasswordHref: authUtils.getForgotPasswordUrl(request),
			bodyClasses: 'signin-page',
			pageType: 'signin-page',
			signinPostURL: '/signin',
			signinFacebookURL: '/signin?method=facebook',
			submitText: 'auth:signin.submit-text',
			formId: 'loginForm',
			pageParams: {
				facebookAppId: settings.facebook.appId
			}
		}
	);
}

/**
 * @param {Hapi.Request} request
 * @returns {SignInViewContext}
 */
function getFBSignInViewContext(request) {
	return deepExtend(authView.getDefaultContext(request),
		{
			title: 'auth:common.connect-with-facebook',
			headerText: 'auth:common.connect-with-facebook',
			headerCallout: 'auth:signin.register-callout',
			headerCalloutLink: 'auth:signin.register-now',
			headerHref: authUtils.getRegisterUrl(request),
			forgotPasswordHref: authUtils.getForgotPasswordUrl(request),
			bodyClasses: 'fb-connect-page',
			pageType: 'fb-connect-page',
			signinPostURL: '/signin',
			heliosFacebookConnectURL: authUtils.getHeliosUrl('/users/'),
			submitText: 'auth:fb-connect.submit-text',
			formId: 'facebookConnectForm',
			headerSlogan: 'auth:fb-connect.facebook-connect-info',
			pageParams: {
				facebookAppId: settings.facebook.appId
			}
		}
	);
}

/**
 * @param {Hapi.Request} request
 * @param {*} reply
 * @returns {Hapi.Response}
 */
function getSignInPage(request, reply) {
	const context = getSignInViewContext(request);

	if (request.auth.isAuthenticated) {
		return authView.onAuthenticatedRequestReply(request, reply, context);
	}

	return authView.view('signin', context, request, reply);
}

/**
 * @param {Hapi.Request} request
 * @param {*} reply
 * @returns {Hapi.Response}
 */
function getFacebookSignInPage(request, reply) {
	const context = getFBSignInViewContext(request);

	if (request.auth.isAuthenticated) {
		return authView.onAuthenticatedRequestReply(request, reply, context);
	}

	return authView.view('signin-fb', context, request, reply);
}

function doSignin(request, reply) {
	const username = querystring.escape(request.payload.username),
		password = querystring.escape(request.payload.password);

	signinUser(username, password, request)
		.then(data => {
			const payload = JSON.parse(data.payload);
			const accessToken = payload.access_token;

			if (accessToken && accessToken.length) {
				reply.state('access_token', accessToken);
			}
			reply({payload}).code(HttpStatus.OK);
		}).catch(data => {
			const payload = JSON.parse(data.payload);
			reply({payload}).code(data.response.statusCode);
		});
}

function doFacebookSignin(request, reply) {
	const fbAccessToken = querystring.escape(request.payload.fb_access_token);

	signinFacebookUser(fbAccessToken, request)
		.then(data => {
			const payload = JSON.parse(data.payload);
			const accessToken = payload.access_token;

			if (accessToken && accessToken.length) {
				reply.state('access_token', accessToken);
			}
			reply({payload}).code(HttpStatus.OK);
		}).catch(data => {
			const payload = JSON.parse(data.payload);

			reply({payload}).code(data.response.statusCode);
		});
}

/**
 * @param {Hapi.Request} request
 * @param {*} reply
 * @returns {void}
 */
export function get(request, reply) {
	if (request.query.method === 'facebook') {
		getFacebookSignInPage(request, reply);
	} else {
		getSignInPage(request, reply);
	}
}

export function post(request, reply) {
	if (request.query.method === 'facebook') {
		doFacebookSignin(request, reply);
	} else {
		doSignin(request, reply);
	}
}
