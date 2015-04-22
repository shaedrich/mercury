/// <reference path='../../../typings/wreck/wreck.d.ts' />
/// <reference path='../../../config/localSettings.d.ts' />
/// <reference path='../../../typings/hapi/hapi.d.ts' />
/// <reference path='../../../typings/boom/boom.d.ts' />
import Boom = require('boom');
import Wreck = require('wreck');
import localSettings = require('../../../config/localSettings');
import qs = require('querystring');
import authUtils = require('../../lib/AuthUtils');

interface AuthParams {
	'user_id': string;
	'access_token': string;
	'refresh_token': string;
	'redirect'?: string;
}

interface AuthCallbackFn {
	(error: Boom.BoomError, response?: any): Function
}

interface HeliosResponse {
	'user_id': string;
	'access_token': string;
	'refresh_token': string;
	'token_type': string;
	'expires_in': string;
	'error'?: string;
	'error_description'?: string;
}

interface LoginViewContext {
	title: string;
	headerText: string;
	footerCallout: string;
	footerCalloutLink: string;
	footerHref?: string;
	forgotPasswordHref?: string;
	hideHeader?: boolean;
	hideFooter?: boolean;
	exitTo?: string;
	bodyClasses?: string;
	formErrorKey?: string;
}

function getLoginContext (redirect: string): LoginViewContext {
	return <LoginViewContext> {
		title: 'auth:login.login-title',
		headerText: 'auth:login.welcome-back',
		footerCallout: 'auth:login.register-callout-text',
		footerCalloutLink: 'auth:login.register-callout-link',
		exitTo: redirect,
		footerHref: authUtils.getSignupUrlFromRedirect(redirect),
		forgotPasswordHref: authUtils.getForgotPasswordUrlFromRedirect(redirect)
	};
}

function authenticate (username: string, password: string, callback: AuthCallbackFn): void {
	Wreck.get(localSettings.helios.host + '/token?' + qs.stringify({
		'grant_type'    : 'password',
		'client_id'     : localSettings.helios.id,
		'client_secret' : localSettings.helios.secret,
		'username'      : username,
		'password'      : password
	}), (err: any, response: any, payload: string) => {
		var parsed: HeliosResponse,
			parseError: Error;

		try {
			parsed = JSON.parse(payload);
		} catch (e) {
			parseError = e;
		}

		// Detects an error with the connection
		if (err || parseError) {
			return callback(err || Boom.wrap(parseError));
		}

		// Helios sends back a 200 currently, denoting failure only in payload differences here
		if (parsed.error) {
			/* tslint:disable:no-string-literal */
			return callback(Boom.unauthorized(parsed.error + ': ' + parsed['error_description']));
			/* tslint:enable:no-string-literal */
		}
		callback(null, parsed);
	});
}

/**
 * Obtains i18n key of a proper message to display in Front-End based on Helios response
 */
function getFormErrorKey (statusCode: number): string {
	if (statusCode === 401) {
		return 'auth:login.wrong-credentials';
	}
	return 'auth:common.server-error';
}

export function get (request: Hapi.Request, reply: any): void {
	var redirect: string = request.query.redirect || '/',
		context: LoginViewContext = getLoginContext(redirect);

	if (request.auth.isAuthenticated) {
		return reply.redirect(redirect);
	}

	return reply.view('login', context, {
		layout: 'auth'
	});
}

export function post (request: Hapi.Request, reply: any): void {
	var credentials: any = request.payload,
		requestedWithHeader: string = request.headers['x-requested-with'],
		isAJAX: boolean = requestedWithHeader && !!requestedWithHeader.match('XMLHttpRequest'),
		redirect: string = request.query.redirect || '/',
		rememberMeTTL = 1.57785e10, // 6 months
		context: LoginViewContext = getLoginContext(redirect);

	authenticate(credentials.username, credentials.password, (err: Boom.BoomError, response: HeliosResponse) => {

		if (err) {
			context.formErrorKey = getFormErrorKey(err.output.statusCode);
			context.exitTo = redirect;

			if (isAJAX) {
				return reply(context).code(err.output.statusCode);
			}

			return reply.view('login', context, {
				layout: 'auth'
			// Always set the correct status code
			}).code(err.output.statusCode);
		}

		request.auth.session.set({
			'access_token'  : response.access_token
		});

		// Set cookie TTL for "remember me" period of 6 months
		// TODO: Helios service should control the length of auth session
		request.auth.session.ttl(1.57785e10);

		if (isAJAX) {
			return reply({redirect: redirect});
		}

		return reply.redirect(redirect);
	});
}
