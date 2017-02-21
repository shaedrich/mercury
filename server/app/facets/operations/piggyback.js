import Wreck from 'wreck';
import translateUserIdFrom from './username';
import {getHeliosInternalUrl} from '../../lib/auth-utils';
import {getInternalHeaders} from '../../lib/utils';
import settings from '../../../config/settings';
import Logger from '../../lib/logger';

function getContext(username, password, targetUserId, request) {
	return {
		url: getHeliosInternalUrl(`/piggyback/token/${targetUserId}`),
		options: {
			headers: getInternalHeaders(request, {
				'Content-type': 'application/x-www-form-urlencoded',
				'X-Wikia-Internal-Request': '1'
			}),
			timeout: settings.helios.timeout,
			payload: `username=${username}&password=${password}&token=${request.state.access_token}`
		},
	};
}

/**
 * @param {string} username
 * @param {string} password
 * @param {string} targetUsername
 * @param {Object} request
 * @returns {Promise}
 */
export function piggybackAsUser(username, password, targetUsername, request) {
	return translateUserIdFrom(targetUsername, request).then(data => {
		const userInfo = JSON.parse(data.payload),
			context = getContext(username, password, userInfo[0].userId, request);
		return new Promise((resolve, reject) => {
			Wreck.post(context.url, context.options, (error, response, payload) => {
				const result = {
					step: 'piggy-back',
					error,
					response,
					payload
				};
				if (response && response.statusCode === 200) {
					resolve(result);
				} else {
					Logger.error({
						url: context.url,
						error,
					}, 'Error from Helios token endpoint.');
					reject(result);
				}
			});
		});
	});
}
