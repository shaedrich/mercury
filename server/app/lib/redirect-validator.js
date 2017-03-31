import Url from 'url';
import {hasImplicitProtocol, hasHttpOrNoProtocol, doesDomainMatchCurrentHost} from './url-utils'

/**
 * @param {string} domain
 * @returns {boolean}
 */
function isWhiteListedDomain(domain) {
	const whiteListedDomains = ['.wikia.com', '.wikia-staging.com', '.wikia-dev.pl', '.wikia-dev.us'];

	/**
	 * @param {string} whileListedDomain
	 * @returns {boolean}
	 */
	return whiteListedDomains.some((whiteListedDomain) => {
		return domain.indexOf(whiteListedDomain, domain.length - whiteListedDomain.length) !== -1;
	});
}

export function isRedirectValid(request, redirectUrl) {
	const currentHost = request.headers.host,
		parsedUrl = Url.parse(redirectUrl),
		redirectUrlHost = parsedUrl.host;

	if (hasImplicitProtocol(redirectUrl) || !hasHttpOrNoProtocol(parsedUrl.protocol)) {
		// The protocol different than HTTP or HTTPS
		return false;
	}

	if (redirectUrlHost) {
		// The URL is not relative, validate domain
		return hostIsWhitelistedOrMatchesCurrent(redirectUrlHost, currentHost);
	}

	return true;
}

export function hostIsWhitelistedOrMatchesCurrent(host, currentHost) {
	return host && (doesDomainMatchCurrentHost(host, currentHost) || isWhiteListedDomain(host));
}
