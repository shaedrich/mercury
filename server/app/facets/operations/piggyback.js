import Wreck from 'wreck';
import {getHeliosInternalUrl} from '../../lib/auth-utils';
import {getInternalHeaders} from '../../lib/utils';
import settings from '../../../config/settings';
import Logger from '../../lib/logger';

function getContext(username, password, targetUserId, request) {
	return {
		url: getHeliosInternalUrl(`/token/${targetUserId}`),
		options: {
			headers: getInternalHeaders(request, {
				'Content-type': 'application/x-www-form-urlencoded',
			}),
			timeout: settings.helios.timeout,
			payload: `username=${username}&password=${password}`
		},
	};
}


/**
 * @param {string} username
 * @param {string} password
 * @param {string} targetUserId
 * @param {Object} request
 * @returns {Promise}
 */
export function piggybackAsUser(username, password, targetUserId, request) {
	const context = getContext(username, password, targetUserId, request);

	return new Promise((resolve, reject) => {
		Wreck.post(context.url, context.options, (error, response, payload) => {
			if (response.statusCode === 200) {
				resolve(new Buffer(payload).toString('utf8'));
			} else {
				Logger.error({
					url: context.url,
					error: error
				}, 'Error from Helios token endpoint.');
				reject({
					statusCode: response.statusCode,
					payload: new Buffer(payload).toString('utf8')
				});
			}
		});
	});
}
