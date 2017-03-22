import {disableCache} from '../../lib/caching';
import {getUserPreferencesUrl} from '../../lib/auth-utils';
import {parse, resolve} from 'url';
import settings from '../../../config/settings';
import ESAPI from 'node-esapi';
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
 * @param {string} domain
 * @param {string} currentHost
 * @returns {boolean}
 */
export function checkDomainMatchesCurrentHost(domain, currentHost) {
	return currentHost === domain ||
		domain.indexOf(`.${currentHost}`, domain.length - currentHost.length - 1) !== -1;
}

/**
 * @param {string} domain
 * @returns {boolean}
 */
export function isWhiteListedDomain(domain) {
	const whiteListedDomains = ['.wikia.com', '.wikia-staging.com', '.wikia-dev.pl', '.wikia-dev.us'];

	/**
	 * @param {string} whileListedDomain
	 * @returns {boolean}
	 */
	return whiteListedDomains.some((whiteListedDomain) => {
		return domain.indexOf(whiteListedDomain, domain.length - whiteListedDomain.length) !== -1;
	});
}

/**
 * @param {Hapi.Request} request
 * @returns {string}
 */
export function getCurrentOrigin(request) {
	// for now the assumption is that there will be https
	return `https://${request.headers.host}`;
}

/**
 * @param {Hapi.Request} request
 * @returns {string}
 */
export function getCanonicalUrl(request) {
	return getCurrentOrigin(request) + request.path;
}

/**
 * @param {Hapi.Request} request
 * @returns {string}
 */
export function getOrigin(request) {
	const currentHost = request.headers.host,
		redirectUrl = request.query.redirect || '/',
		redirectUrlHost = parse(redirectUrl).host,
		redirectUrlOrigin = `${parse(redirectUrl).protocol}//${redirectUrlHost}`;

	if (redirectUrlHost && (
			checkDomainMatchesCurrentHost(redirectUrlHost, currentHost) ||
			isWhiteListedDomain(redirectUrlHost)
		)
	) {
		return redirectUrlOrigin;
	}

	return getCurrentOrigin(request);
}

/**
 * Workaround for node's problems with implicit URLs
 * @param url
 * @return {boolean}
 */
function hasImplicitProtocol(url) {
	return url.substr(0, 2) === '//';
}

/**
 * We only allow HTTP or HTTPS or no protocol. "javascript:" for example will be rejected.
 * @param protocol
 * @return {boolean}
 */
function hasInvalidProtocol(protocol) {
	return !(protocol === 'http:' || protocol === 'https:' || !protocol);
}

/**
 * @param {Hapi.Request} request
 * @returns {string}
 */
export function getRedirectUrl(request) {
	const currentHost = request.headers.host,
		redirectUrl = request.query.redirect || '/',
		parsedUrl = parse(redirectUrl),
		redirectUrlHost = parsedUrl.host;

	if (hasImplicitProtocol(redirectUrl) ||
		hasInvalidProtocol(parsedUrl.protocol) ||
		(
			redirectUrlHost &&
			!checkDomainMatchesCurrentHost(redirectUrlHost, currentHost) &&
			!isWhiteListedDomain(redirectUrlHost)
		)
	) {
		return '/';
	} else {
		return redirectUrl;
	}
}

/**
 * @param {Hapi.Request} request
 * @param {*} reply
 * @returns {*}
 */
export function validateRedirect(request, reply) {
	const queryRedirectUrl = getRedirectUrl(request);

	// redirect only if redirect url domain is on whitelist
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

function encodeForJavaScript(value) {
	return ESAPI.encoder().encodeForJavaScript(value);
}

/**
 * @param {Hapi.Request} request
 * @returns {AuthViewContext}
 */
export function getDefaultContext(request) {
	const viewType = getViewType(request),
		isModal = request.query.modal === '1',
		redirectUrl = getRedirectUrl(request),
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
		pageParams.parentOrigin = encodeForJavaScript(getOrigin(request));
	}

	/* eslint no-undefined: 0 */
	return {
		title: null,
		canonicalUrl: getCanonicalUrl(request),
		exitTo: getRedirectUrl(request),
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
	const redirect = getRedirectUrl(request);

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
