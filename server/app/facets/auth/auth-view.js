import {disableCache} from '../../lib/caching';
import {getUserPreferencesUrl} from '../../lib/auth-utils';
import {getValidRedirectUrl, getValidOriginUrl} from '../../lib/auth-url-factory';
import {getCanonicalUrl} from '../../lib/url-utils';
import {encodeForJavaScript} from '../../lib/sanitizer';
import {resolve} from 'url';
import settings from '../../../config/settings';
import {shouldServeMobileView} from '../../lib/utils';

/**
 * @typedef {string[]} PageParams
 */

/**
 * @typedef {Object} AuthViewContext
 * @property {string} title
 * @property {string} canonicalUrl
 * @property {string} language
 * @property {string} exitTo
 * @property {string} mainPage
 * @property {string} optimizelyScript
 * @property {PageParams} pageParams
 * @property {string} [headerCallout]
 * @property {string} [headerCalloutLink]
 * @property {string} [headerText]
 * @property {string} [bodyClasses]
 * @property {string} [pageType]
 * @property {string} [parentOrigin]
 * @property {boolean} [standalone]
 * @property {*} [trackingConfig]
 */

export const VIEW_TYPE_MOBILE = 'mobile',
	VIEW_TYPE_DESKTOP = 'desktop';

/**
 * @param {Hapi.Request} request
 * @param {*} reply
 * @returns {*}
 */
export function validateRedirect(request, reply) {
	const queryRedirectUrl = getValidRedirectUrl(request);
	// if redirect present and has been validated then replace with new one
	if (request.query.redirect && queryRedirectUrl !== request.query.redirect) {
		request.url.query.redirect = queryRedirectUrl;
		request.url.search = null;
		return reply.redirect(request.url.format()).takeover();
	}

	return reply();
}

/**
 * @param {Hapi.Request} request
 * @returns {string}
 */
export function getViewType(request) {
	if (shouldServeMobileView(request.headers['user-agent'])) {
		return VIEW_TYPE_MOBILE;
	} else {
		return VIEW_TYPE_DESKTOP;
	}
}

/**
 * @param {string} template
 * @param {AuthViewContext} context
 * @param {Hapi.Request} request
 * @param {*} reply
 * @param layout either 'card' or 'auth', 'auth' is default
 * @returns {Hapi.Response}
 */
export function view(template, context, request, reply, layout = 'auth') {
	const response = reply.view(
		`auth/${getViewType(request)}/${template}`,
		context,
		{layout}
	);

	disableCache(response);
	return response;
}

/**
 * @param {Hapi.Request} request
 * @returns {AuthViewContext}
 */
export function getDefaultContext(request) {
	const viewType = getViewType(request),
		isModal = request.query.modal === '1',
		redirectUrl = encodeForJavaScript(getValidRedirectUrl(request)),
		reactivateAccountUrl = resolve(redirectUrl, '/Special:CloseMyAccount/reactivate'),
		pageParams = {
			cookieDomain: settings.authCookieDomain,
			enableSocialLogger: settings.clickstream.social.enable,
			isModal,
			reactivateAccountUrl,
			redirectUrl,
			preferenceServiceUrl: getUserPreferencesUrl('/'),
			socialLoggerUrl: settings.clickstream.social.url,
			viewType,
		};

	if (request.query.forceLogin) {
		// we're expecting 0 or 1, but it comes from querystring - that's why parseInt
		pageParams.forceLogin = Boolean(parseInt(request.query.forceLogin, 10));
	}

	if (isModal) {
		pageParams.parentOrigin = getValidOriginUrl(request);
	}

	/* eslint no-undefined: 0 */
	return {
		title: null,
		canonicalUrl: getCanonicalUrl(request),
		exitTo: getValidRedirectUrl(request),
		mainPage: 'http://www.wikia.com',
		language: request.server.methods.i18n.getInstance().lng(),
		trackingConfig: settings.tracking,
		server: {
			gaUrl: settings.tracking.ua.scriptUrl
		},
		standalonePage: (viewType === VIEW_TYPE_DESKTOP && !isModal),
		pageParams
	};
}

/**
 * @param {Hapi.Request} request
 * @param {*} reply
 * @param {AuthViewContext} context
 * @returns {Hapi.Response}
 */
export function onAuthenticatedRequestReply(request, reply, context) {
	const redirect = getValidRedirectUrl(request);
	if (context.pageParams.isModal) {
		return reply.view(
			'auth/desktop/modal-message',
			context,
			{
				layout: 'auth-modal-empty'
			}
		);
	}
	return reply.redirect(redirect);
}
