import Wreck from 'wreck';
import {getHeliosInternalUrl} from '../../lib/auth-utils';
import {getInternalHeaders} from '../../lib/utils';
import settings from '../../../config/settings';
import Logger from '../../lib/logger';

function getSigninContext(username, password, request) {
	return {
		url: getHeliosInternalUrl('/token'),
		options: {
			headers: getInternalHeaders(request, {
				'Content-type': 'application/x-www-form-urlencoded',
				'X-Wikia-Internal-Request': '1'
			}),
			timeout: settings.helios.timeout,
			payload: `username=${username}&password=${password}`
		},
	};
}

function getFacebookSigninContext(fbAccessToken, request) {
	return {
		url: getHeliosInternalUrl('/facebook/token'),
		options: {
			headers: getInternalHeaders(request, {
				'Content-type': 'application/x-www-form-urlencoded',
				'X-Wikia-Internal-Request': '1'
			}),
			timeout: settings.helios.timeout,
			payload: `fb_access_token=${fbAccessToken}`
		},
	};
}

/**
 * @param {string} username
 * @param {string} password
 * @param {string} targetUsername
 * @param {Hapi.Request} request
 * @returns {Promise}
 */
export function signinUser(username, password, request) {
	const context = getSigninContext(username, password, request);
	return new Promise((resolve, reject) => {
		Wreck.post(context.url, context.options, (error, response, payload) => {
			if (response && response.statusCode === 200) {
				resolve({
					payload: new Buffer(payload).toString('utf8')
				});
			} else {
				Logger.error({
					url: context.url,
					error,
				}, 'Error from Helios token endpoint.');
				reject({
					response,
					payload: new Buffer(payload).toString('utf8')
				});
			}
		});
	});
}

export function signinFacebookUser(fbAccessToken, request) {
	const context = getFacebookSigninContext(fbAccessToken, request);
	return new Promise((resolve, reject) => {
		Wreck.post(context.url, context.options, (error, response, payload) => {
			if (response && response.statusCode === 200) {
				resolve({
					payload: new Buffer(payload).toString('utf8')
				});
			} else {
				Logger.error({
					url: context.url,
					error,
				}, 'Error from Helios Facebook token endpoint.');
				reject({
					response,
					payload: new Buffer(payload).toString('utf8')
				});
			}
		});
	});
}
