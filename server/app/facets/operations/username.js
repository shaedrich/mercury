import Logger from '../../lib/logger';
import Promise from 'bluebird';
import settings from '../../../config/settings';
import {getInternalHeaders} from '../../lib/utils';
import Wreck from 'wreck';

/**
 * @param {string} username
 * @param {Object} request
 * @returns {Promise}
 */
export default function translateUserIdFrom(username, request) {
	const url = `${settings.userRegistrationService.internalUrl}/users?username=${username}`;

	const options = {
		headers: getInternalHeaders(request, {
			'X-Wikia-Internal-Request': 'mercury',
			'User-Agent': 'mercury'
		}),
		timeout: settings.userRegistrationService.timeout
	};
	return new Promise((resolve, reject) => {
		Wreck.get(url, options, (error, response, payload) => {
			if (!error && response.statusCode === 200) {
				const userInfo = JSON.parse(payload);

				if (userInfo.length) {
					resolve({
						response,
						payload,
						username
					});
				} else {
					response.statusCode = 404;

					reject({
						step: 'user-discovery',
						error: {},
						response,
						payload
					});
				}
			} else {
				Logger.error('Error while discovering user info.', {url});

				reject({
					step: 'user-discovery',
					error,
					response,
					payload
				});
			}
		});
	});
}
