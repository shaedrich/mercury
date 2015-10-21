/// <reference path="../../typings/hapi/hapi.d.ts" />

import Logger = require('../lib/Logger');
import MainPage = require('../lib/MainPage');
import MediaWiki = require('../lib/MediaWiki');
import Utils = require('../lib/Utils');
import localSettings = require('../../config/localSettings');
import processCuratedContentData = require('./operations/processCuratedContentData');
import Promise = require('bluebird');


export function category (request: Hapi.Request, reply: Hapi.Response): void {
	fetchData(request, reply);
}

export function section (request: Hapi.Request, reply: Hapi.Response): void {
	fetchData(request, reply);
}

function fetchData(request: Hapi.Request, reply: Hapi.Response): void {
	var wikiDomain: string = Utils.getCachedWikiDomainName(localSettings, request),
		params: ArticleRequestParams = {
			wikiDomain: wikiDomain
		},
		mainPage: MainPage.MainPageRequestHelper,
		allowCache = true;

	if (request.state.wikicities_session) {
		params.headers = {
			'Cookie': `wikicities_session=${request.state.wikicities_session}`
		};
		allowCache = false;
	}

	mainPage = new MainPage.MainPageRequestHelper(params);

	mainPage.setTitle(request.params.title);
	mainPage.getWikiVariablesAndDetails()
		.then((data: any): void => {
			Utils.redirectToCanonicalHostIfNeeded(localSettings, request, reply, data.wikiVariables);
			processCuratedContentData(request, reply, data, allowCache);
		})
		.catch(MainPage.MainPageDataRequestError, (error: any) => {
			var data = error.data;
			Logger.error('Error when fetching ads context and article details', data.mainPageData.exception);
			processCuratedContentData(request, reply, data, false);
		})
		.catch(MainPage.WikiVariablesRequestError, (error: any) => {
			Logger.error('Error when fetching wiki variables', error);
			reply.redirect(localSettings.redirectUrlOnNoData);
		})
		.catch(Utils.RedirectedToCanonicalHost, (): void => {
			Logger.info('Redirected to canonical host');
		})
		.catch((error: any): void => {
			Logger.fatal('Something wrong with the code', error);
			reply.redirect(localSettings.redirectUrlOnNoData);
		});
}
