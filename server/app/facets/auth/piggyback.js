import * as authUtils from "../../lib/auth-utils";
import settings from "../../../config/settings";
import * as authView from "./auth-view";
import deepExtend from "deep-extend";
import * as signIn from "../operations/signin";
import querystring from "querystring";
import {disableCache} from '../../lib/caching';

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
			bodyClasses: 'signin-page',
			pageType: 'signin-page',
			piggybackPostURL: '/signin',
			submitText: 'auth:signin.submit-text',
			formId: 'piggybackForm',
			headerText: 'auth:piggyback.header'
		}
	);
}

/**
 * @param {Hapi.Request} request
 * @param {*} reply
 * @returns {void}
 */
export function get(request, reply) {
	const context = getViewContext(request);

	if (request.auth.isAuthenticated) {
		return authView.onAuthenticatedRequestReply(request, reply, context);
	}

	return assembleView(context, request, reply);
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
export function post(request, reply) {
	const username = querystring.escape(request.payload.username),
		password = querystring.escape(request.payload.password),
		targetUsername = querystring.escape(request.payload.targetUsername);
	signIn.withUserCredentials(username, password, request)
		.then(data => {
			const accessToken = JSON.parse(data).access_token;
			if (accessToken && accessToken.length) {
				reply.state('access_token', accessToken);
			}
			reply({payload: data.payload}).code(200);
		}).catch(data => {
		reply({payload: data.payload}).code(data.statusCode);
	});
}
