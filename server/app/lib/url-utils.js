import Url from 'url';

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
 * Workaround for node's problems with implicit URLs
 * @param url
 * @return {boolean}
 */
export function hasImplicitProtocol(url) {
	return url.substr(0, 2) === '//';
}

export function hasHttpProtocol(protocol) {
	return protocol === 'http:' || protocol === 'https:';
}

/**
 * We only allow HTTP or HTTPS or no protocol. "javascript:" for example will be rejected.
 * @param protocol
 * @return {boolean}
 */
export function hasHttpOrNoProtocol(protocol) {
	return hasHttpProtocol(protocol) || !protocol;
}

function isSubdomain(domain, host) {
	return (new RegExp('^.+[.]'+host+'$')).test(domain);
}

/**
 * @param {string} domain
 * @param {string} host
 * @returns {boolean}
 */
export function doesDomainMatchCurrentHost(domain, host) {
	return host === domain || isSubdomain(domain, host) || isSubdomain(host, domain);
}
