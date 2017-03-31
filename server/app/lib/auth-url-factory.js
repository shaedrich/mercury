import Url from 'url';
import {getHost, hasHttpProtocol} from './url-utils'
import {isRedirectValid, hostIsWhitelistedOrMatchesCurrent} from './redirect-validator'

/**
 * @param {Hapi.Request} request
 * @param {*} reply
 * @returns {*}
 */
export function getValidRedirectUrl(request) {
	const redirectUrl = request.query.redirect || '/';
	if (isRedirectValid(request, redirectUrl)) {
		return redirectUrl;
	} else {
		return '/';
	}
}

/**
 * @param {Hapi.Request} request
 * @returns {string}
 */
export function getValidOriginUrl(request) {
	const currentHost = request.headers.host,
		redirectUrl = request.query.redirect || '/',
		parsedUrl = Url.parse(redirectUrl),
		redirectUrlHost = parsedUrl.host,
		redirectUrlProtocol = parsedUrl.protocol;

	if (hostIsWhitelistedOrMatchesCurrent(redirectUrlHost, currentHost)
		&& hasHttpProtocol(redirectUrlProtocol)) {
		// Domain or protocol is valid so return the redirect URL without the path or queries
		return Url.format({
			protocol: redirectUrlProtocol,
			host: redirectUrlHost
		});
	} else {
		// Domain or protocol is invalid so return the host
		return getHost(request);
	}
}

function getPayloadRedirect(payload) {
	if (payload && payload.redirect) {
		return payload.redirect;
	} else {
		return null;
	}
}

export function getRedirectUrlForPost(request) {
	const redirectUrl = getPayloadRedirect(request.payload) || request.query.redirect || '/';
	if (isRedirectValid(request, redirectUrl)) {
		return redirectUrl;
	} else {
		return '/';
	}
}
