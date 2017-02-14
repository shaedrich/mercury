import Wreck from 'wreck';
import translateUserIdFrom from './username';
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
		const context = getContext(username, password, JSON.parse(data.payload)[0].userId, request);
		Logger.error(context);
		return new Promise((resolve, reject) => {
			Wreck.post(context.url, context.options, (error, response, payload) => {
				// Logger.error(response);
				Logger.error("err " + JSON.stringify(error));
				// Logger.error("payload " + JSON.stringify(payload));
				if (error) {
					// Logger.error("payload " + JSON.stringify(payload));
					reject({
						statusCode: error.output.statusCode
					});
				} else if (response.statusCode === 200) {
					let toString = new Buffer(payload).toString('utf8');
					Logger.error(toString);

					resolve(toString);
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
	});
}
