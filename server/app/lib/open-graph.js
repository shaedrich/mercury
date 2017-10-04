import Promise from 'bluebird';
import settings from '../../config/settings';
import * as MW from './mediawiki';
import {getStaticAssetPath} from './utils';

/**
 * @property {string} [description]
 * @property {string} [image]
 * @property {number} [imageHeight]
 * @property {number} [imageWidth]
 * @property {string} title
 * @property {string} type
 * @property {string} url
 */
function fromOpenGraph(openGraph) {
	return {
		image: openGraph.imageUrl,
		imageHeight: openGraph.imageHeight,
		imageWidth: openGraph.imageWidth
	};
}

function fromContentImage(contentImage) {
	return {
		image: contentImage.url,
		imageHeight: contentImage.height,
		imageWidth: contentImage.width
	}
}

function getLargestImage(images) {
	images.sort((a, b) => b.imageWidth * b.imageHeight - a.imageWidth * a.imageHeight);
	return images[0];
}

function getPostOpenGraphImages(posts) {
	return posts
		.map(post => post._embedded.openGraph)
		.filter(openGraphs => openGraphs && openGraphs.length > 0)
		.map(openGraphs => openGraphs[0])
		.map(openGraph => fromOpenGraph(openGraph));
}

function getPostContentImages(posts) {
		return posts
			.map(post => post._embedded.contentImages)
			.filter(contentImages => contentImages && contentImages.length > 0)
			.map(contentImages => contentImages[0])
			.map(contentImage => fromContentImage(contentImage));
}

/**
 * @param {*} communityHeader
 **/
function getCommunityHeaderImage(communityHeader) {
	try {
		return {image: communityHeader.wordmark['image-data'].url};
	} catch (e) {
		// there was a null in the chain
		return null;
	}
}

/**
 * @param {Hapi.Request} request
 **/
function generateFandomLogoOpenGraph(request) {
	return {
		image: `http:${getStaticAssetPath(settings, request)}` +
		'common/images/og-fandom-logo.jpg',
		imageHeight: 1200,
		imageWidth: 1200
	};
}

/**
 * @param {*} response
 * @param {Hapi.Request} request
 * @param {*} context
 */
function fetchOpenGraphImage(response, request, context) {
	const thread = response.payload._embedded;

	if (thread.contentImages && thread.contentImages.length > 0) {
		return fromContentImage(thread.contentImages[0]);
	}

	if (thread.openGraph && thread.openGraph.length > 0) {
		return fromOpenGraph(thread.openGraph[0]);
	}

	const posts = response.payload._embedded['doc:posts'] || [];

	const contentImages = getPostContentImages(posts);
	if (contentImages.length > 0) {
		return getLargestImage(contentImages);
	}

	const openGraphImages = getPostOpenGraphImages(posts);
	if (openGraphImages.length > 0) {
		return getLargestImage(openGraphImages);
	}

	const communityHeaderImage = getCommunityHeaderImage(context.communityHeader);
	if (communityHeaderImage !== null) {
		return communityHeaderImage;
	}

	return generateFandomLogoOpenGraph(request);
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
