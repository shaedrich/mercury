/**
 * Helper methods for the Auth Flow
 */

import url from 'url';
import querystring from 'querystring';
import settings from '../../config/settings';
import authLocaleSettings from '../../config/authLocaleSettings.js';
import {setUrlPathname} from './url-utils';

/**
 * @param {Hapi.Request} request
 * @returns {string}
 */
export function getRegisterUrl(request) {
	return this.getRedirectUrlWithQueryString('register', request);
}

/**
 * @param {string} redirect
 * @returns {string}
 */
export function getForgotPasswordUrl(request) {
	return this.getRedirectUrlWithQueryString('forgot-password', request);
}

/**
 * @param {string} redirect
 * @returns {string}
 */
export function getExpiryForgotPasswordUrl(request) {
	const forgotPasswordUrl = url.parse(this.getForgotPasswordUrl(request));

	forgotPasswordUrl.search = `${forgotPasswordUrl.search}&tokenExpired=1`;
	return forgotPasswordUrl.format();
}

/**
 * @param {Hapi.Request} request
 * @returns {string}
 */
export function getSignInUrl(request) {
	return this.getRedirectUrlWithQueryString('signin', request);
}

/**
 * @param {string} redirect
 * @returns {string}
 */
export function getCacheBusterUrl(redirect) {
	const cacheBustedUrlObj = url.parse(redirect),
		query = querystring.parse(cacheBustedUrlObj.query);

	query.cb = Math.floor(Math.random() * 10000);
	cacheBustedUrlObj.search = querystring.stringify(query);

	return url.format(cacheBustedUrlObj);
}

/**
 * @param {string} route
 * @param {Hapi.Request} request
 * @returns {string}
 */
export function getRedirectUrlWithQueryString(route, request) {
	return setUrlPathname(request.url.format(), route);
}

/**
 * @param {string} path
 * @returns {string}
 */
export function getHeliosUrl(path) {
	return url.format({
		protocol: 'https',
		host: settings.servicesDomain,
		pathname: settings.helios.path + path
	});
}

/**
 * @param {string} path
 * @param {object} query
 *
 * @returns {string}
 */
export function getHeliosInternalUrl(path, query = null) {
	const heliosUrlObj = url.parse(settings.helios.internalUrl);

	if (heliosUrlObj.pathname === '/') {
		heliosUrlObj.pathname = path;
	} else {
		heliosUrlObj.pathname += path;
	}
	heliosUrlObj.search = querystring.stringify(query);

	return url.format(heliosUrlObj);
}

/**
 * @param {string} path
 * @returns {string}
 */
export function getUserRegistrationUrl(path) {
	return url.format({
		protocol: 'https',
		host: settings.servicesDomain,
		pathname: settings.userRegistationService.path + path
	});
}

/**
 * @param {string} path
 * @returns {string}
 */
export function getUserPreferencesUrl(path) {
	return url.format({
		protocol: 'https',
		host: settings.servicesDomain,
		pathname: settings.userPreferencesService.baseAPIPath + path
	});
}

/**
 * @param {object} i18n
 * @returns {string}
 */
export function getLanguageWithDefault(i18n = {}) {
	const lang = i18n.lng();

	return authLocaleSettings.hasOwnProperty(lang) ? lang : 'en';
}
