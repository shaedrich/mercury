import Promise from 'bluebird';
import settings from '../../config/settings';
import * as MW from './mediawiki';
import {getStaticAssetPath} from './utils';
import injectDesignSystemData from '../lib/inject-design-system-data';

/**
 * @typedef {Object} OpenGraphAttributes
 * @property {string} [description]
 * @property {string} [image]
 * @property {number} [imageHeight]
 * @property {number} [imageWidth]
 * @property {string} title
 * @property {string} type
 * @property {string} url
 */

/**
 * @param {*} response
 * @param {Hapi.Request} request
 * @param {*} context
 */
function fetchOpenGraphImage(response, request, context) {
	const postsWithOpenGraph = response.payload._embedded['doc:posts']
			? response.payload._embedded['doc:posts'].filter(post => post._embedded.openGraph)
			: [];
	if (response.payload._embedded.openGraph) {
		// Use OpenGraph in main post
		const openGraph = response.payload._embedded.openGraph[0];
		return {
			image: openGraph.imageUrl,
			imageHeight: openGraph.imageHeight,
			imageWidth: openGraph.imageWidth
		};
	} else if (postsWithOpenGraph.length > 0) {
		// Use largest OpenGraph image in replies
		let postOpenGraphData = postsWithOpenGraph.map(post => post._embedded.openGraph[0]);
		postOpenGraphData.sort((a, b) => b.imageWidth * b.imageHeight - a.imageWidth * a.imageHeight);
		const largestOpenGraph = postOpenGraphData[0];
		return {
			image: largestOpenGraph.imageUrl,
			imageHeight: largestOpenGraph.imageHeight,
			imageWidth: largestOpenGraph.imageWidth
		};
	} else if (context.communityHeader !== null) {
		// Use the wordmark image
		return {
			image: context.communityHeader.wordmark['image-data'].url
		};
	} else {
		// Use Fandom logo as default image
		return {
			image: `http:${getStaticAssetPath(settings, request)}` +
			'common/images/og-fandom-logo.jpg',
			imageHeight: 1200,
			imageWidth: 1200
		};
	}
}

/**
 * @param {Hapi.Request} request
 * @param {*} context
 * @returns {Promise}
 */
export function getPromiseForDiscussionData(request, context) {
	const wikiVars = context.wikiVariables;
	const i18n = request.server.methods.i18n.getInstance(),
		openGraphData = {};

	// Discussion post
	if (request.params.type === 'p' && request.params.id) {
		// Get post ID, which might be prepended with slug text
		const regexMatch = request.params.id.match(/(\d+)$/);

		if (regexMatch !== null) {
			const apiUrl = `http://${settings.servicesDomain}/${settings.discussions.baseAPIPath}` +
				`/${wikiVars.id}/threads/${regexMatch[1]}?responseGroup=full`;

			openGraphData.type = 'article';
			openGraphData.url = wikiVars.basePath + request.path;

			/**
			 * @param {Function} resolve
			 * @param {Function} reject
			 * @returns {void}
			 */
			return new Promise((resolve, reject) => {
				// Fetch discussion post data from the API to complete the OG data
				MW.fetch(apiUrl)
					/**
					 * @param {*} data
					 * @returns {void}
					 */
					.then((response) => {
						const content = response.payload._embedded.firstPost[0].rawContent;

						openGraphData.title = response.payload.title ?
							response.payload.title :
							i18n.t('main.share-default-title', {siteName: wikiVars.siteName, ns: 'discussion'});
						// Keep description to 175 characters or less
						openGraphData.description = content.substr(0, 175);

						Object.assign(openGraphData, fetchOpenGraphImage(response, request, context));

						resolve(openGraphData);
					})
					/**
					 * @param {*} error
					 * @returns {void}
					 */
					.catch((error) => {
						if (error.exception && error.exception.code === 404) {
							// Let fronted handle 404 error when post doesn't exist
							resolve();
						} else {
							reject(error);
						}
					});
			});
		}
	}

	return Promise.resolve(openGraphData);
}

/**
 * @param {Hapi.Request} request
 * @param {*} context
 * @returns {Promise}
 */
export function getAttributes(request, context) {
	// Discussions path
	if (request.path.split('/')[1] === 'd') {
		return getPromiseForDiscussionData(request, context);
	}

	return Promise.resolve({});
}
