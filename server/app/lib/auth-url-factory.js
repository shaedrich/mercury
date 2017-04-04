import Url from 'url';
import {getHost, isHttpProtocol} from './url-utils';
import {isRedirectValid, isWhitelistedDomainOrMatchesCurrent} from './redirect-validator';

/**
 * @param {Hapi.Request} request
 * @returns {string}
 */
export function getValidRedirectUrl(request) {
	const redirectUrl = request.query.redirect || '/';
	return getRedirectUrlOrElse(request.headers.host, redirectUrl, '/');
}

/**
 * @param {Hapi.Request} request
 * @returns {string}
 */
export function getRedirectUrlForPost(request) {
	const redirectUrl = getPayloadRedirect(request.payload) || request.query.redirect || '/';
	return getRedirectUrlOrElse(request.headers.host, redirectUrl, '/');
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

	if (isWhitelistedDomainOrMatchesCurrent(redirectUrlHost, currentHost)
		&& isHttpProtocol(redirectUrlProtocol)) {
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

function getRedirectUrlOrElse(currentHost, desiredUrl, alternativeUrl) {
	return isRedirectValid(currentHost, desiredUrl) ? desiredUrl : alternativeUrl;
}
