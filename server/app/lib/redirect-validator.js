import Url from 'url';
import {hasImplicitProtocol, isHttpOrEmptyProtocol, areDomainsMatching} from './url-utils';

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

export function isWhitelistedDomainOrMatchesCurrent(domain, currentHost) {
	return domain && (areDomainsMatching(domain, currentHost) || isWhiteListedDomain(domain));
}

export function isRedirectValid(currentHost, redirectUrl) {
	const parsedUrl = Url.parse(redirectUrl),
		redirectUrlHost = parsedUrl.host;

	if (hasImplicitProtocol(redirectUrl) || !isHttpOrEmptyProtocol(parsedUrl.protocol)) {
		// The protocol different than HTTP or HTTPS
		return false;
	}

	if (redirectUrlHost) {
		// The URL is not relative, validate domain
		return isWhitelistedDomainOrMatchesCurrent(redirectUrlHost, currentHost);
	}

	return true;
}
