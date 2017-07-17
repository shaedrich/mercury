import {WikiRequest, fetch} from '../lib/mediawiki';
import {getCachedWikiDomainName} from '../lib/utils';
import settings from '../../config/settings';
import showApplication from './show-application';
import showServerErrorPage from './operations/show-server-error-page';
import Logger from '../lib/logger';
import {getOptimizelyScriptUrl} from './operations/page-data-helper';
import {NonJsonApiResponseError, WikiVariablesRequestError} from '../lib/custom-errors';
import {reach} from 'hoek';

function fetchContributors({context, variables}) {
	const apiUrl = `http://${settings.servicesDomain}/${settings.discussions.baseAPIPath}` +
		`/${variables.id}/threads?page=0&limit=1&viewableOnly=true`;

	return fetch(apiUrl)
		.then((response) => {
			const contributors = reach(response, 'payload._embedded.contributors.0.userInfo') || [];
			context.discussionsContributors = contributors.slice(0, 5);

			return variables;
		})
		.catch(() => {
			context.discussionsContributors = [];

			return variables;
		});
}

/**
 * Renders discussions page
 *
 * @param {Hapi.Request} request
 * @param {*} reply
 * @returns {void}
 */
export default function showDiscussions(request, reply) {
	const wikiDomain = getCachedWikiDomainName(settings, request),
		wikiVariables = new WikiRequest({wikiDomain}).wikiVariables(),
		context = {};

	wikiVariables.then((variables) => {
		const wikiHtmlTitle = variables.htmlTitle;

		if (!variables.enableDiscussions) {
			return reply('Not Found').code(404);
		}

		context.htmlTitle = `Discussions${wikiHtmlTitle.separator}${wikiHtmlTitle.parts.join(wikiHtmlTitle.separator)}`;
		context.showSpinner = true;
		context.optimizelyScript = getOptimizelyScriptUrl(request);

		return {
			context,
			variables
		};
	})
	.then(fetchContributors)
	.then((variables) => {
		showApplication(request, reply, variables, context, true);
	})
	/**
	 * If request for Wiki Variables fails
	 * @returns {void}
	 */
	.catch(WikiVariablesRequestError, () => {
		showServerErrorPage(reply);
	})
	/**
	 * If request for Wiki Variables succeeds, but wiki does not exist
	 * @returns {void}
	 */
	.catch(NonJsonApiResponseError, (err) => {
		reply.redirect(err.redirectLocation);
	})
	/**
	 * @param {*} error
	 * @returns {void}
	 */
	.catch((error) => {
		Logger.fatal(error, 'Unhandled error, code issue');
		showServerErrorPage(reply);
	});
}
