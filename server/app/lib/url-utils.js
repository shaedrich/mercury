import Url from 'url';

/**
 * @param {string} url
 * @param {string} pathname
 * @returns {string}
 */
export function setUrlPathname(url, pathname) {
	const urlObject = Url.parse(url);
	urlObject.pathname = pathname;
	return urlObject.format();
}

/**
 * @param {string} url
 * @param {object} queryParams
 * @returns {string} url
 */
export function setUrlQuery(url, queryParams) {
	const urlObject = Url.parse(url);
	// if search is not undefined then query won't have an effect
	urlObject.search = undefined;
	urlObject.query = queryParams;
	return urlObject.format();
}

/**
 * @param {Hapi.Request} request
 * @param {boolean} ssl - should use https, default true
 * @returns {string}
 */
export function getHost(request, ssl = true) {
	return Url.format({
		protocol: ssl ? 'https:' : 'http:',
		host: request.headers.host
	});
}

/**
 * @param {Hapi.Request} request
 * @param {boolean} ssl - should use https, default true
 * @returns {string}
 */
export function getCanonicalUrl(request, ssl = true) {
	return Url.format({
		protocol: ssl ? 'https:' : 'http:',
		host: request.headers.host,
		pathname: request.path
	});
}

/**
 * Workaround for node's problems with implicit URLs.
 * @param url
 * @return {boolean}
 */
export function hasImplicitProtocol(url) {
	return url.substr(0, 2) === '//';
}

/**
 * Check if protocol is HTTP or HTTPS.
 * @param {string} protocol
 * @return {boolean}
 */
export function isHttpProtocol(protocol) {
	return protocol === 'http:' || protocol === 'https:';
}

/**
 * We only allow HTTP or HTTPS or no protocol. "javascript:" for example will be rejected.
 * @param protocol
 * @return {boolean}
 */
export function isHttpOrEmptyProtocol(protocol) {
	return isHttpProtocol(protocol) || !protocol;
}

/**
 * Check if this is a subdomain of a specified domain.
 * @param {string} possibleSubdomain
 * @param {string} domain
 * @return {boolean}
 */
function isSubdomain(possibleSubdomain, domain) {
	return (new RegExp(`^.+[.]${domain}$`)).test(possibleSubdomain);
}

/**
 * Check if the domains the same or is one a subdomain of the other.
 * @param {string} firstDomain
 * @param {string} secondDomain
 * @returns {boolean}
 */
export function areDomainsMatching(firstDomain, secondDomain) {
	return secondDomain === firstDomain
		|| isSubdomain(firstDomain, secondDomain)
		|| isSubdomain(secondDomain, firstDomain);
}
