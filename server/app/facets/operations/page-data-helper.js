import deepExtend from 'deep-extend';
import settings from '../../../config/settings';

/**
 * @typedef {Object} OpenGraphData
 * @property {String} type
 * @property {String} title
 * @property {String} url
 * @property {String} [description]
 * @property {String} [image]
 */

/**
 * @param {Object} wikiVariables
 * @returns {boolean}
 */
export function isRtl(wikiVariables) {
	if (wikiVariables.language) {
		return wikiVariables.language.contentDir === 'rtl';
	}

	return false;
}

/**
 * @param {Hapi.Request} request
 * @returns {string}
 */
export function getAccessToken(request) {
	return request.state.access_token;
}

/**
 * @param {Hapi.Request} request
 * @returns {number}
 */
export function getUserId(request) {
	return request.auth.isAuthenticated ? request.auth.credentials.userId : 0;
}

/**
 * @param {String} type
 * @param {String} title
 * @param {String} url
 * @param {Object} [pageData={}]
 * @returns {OpenGraphData}
 */
export function getOpenGraphData(type, title, url, pageData = {}) {
	const openGraphData = {
		type,
		title,
		url
	};

	if (pageData && pageData.details) {
		if (pageData.details.abstract) {
			openGraphData.description = pageData.details.abstract;
		}

		if (pageData.details.thumbnail) {
			openGraphData.image = pageData.details.thumbnail;
		}
	}

	return openGraphData;
}

/**
 * @returns {Settings}
 */
export function getSettings() {
	return deepExtend({}, settings);
}

/**
 * @param {Hapi.Request} request
 * @param {Object} pageData
 * @returns {String}
 */
export function getDisplayTitle(request, pageData) {
	if (pageData) {
		if (pageData.article && pageData.article.displayTitle) {
			return pageData.article.displayTitle;
		} else if (pageData.details && pageData.details.title) {
			return pageData.details.title;
		}
	}

	return request.params.title.replace(/_/g, ' ');
}
