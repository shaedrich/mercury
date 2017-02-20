import * as authUtils from '../../lib/auth-utils';
import {getInternalHeaders} from '../../lib/utils';
import settings from '../../../config/settings';
import Logger from '../../lib/logger';
import Wreck from 'wreck';

function getContext(token, request) {
	return {
		url: authUtils.getHeliosUrl(`/token/${token}`),
		options: {
			headers: getInternalHeaders(request, {
				'Content-type': 'application/x-www-form-urlencoded',
			}),
			timeout: settings.helios.timeout
		},
	};
}


/**
 * @param token
 * @param {Object} request
 * @returns {Promise}
 */
export function signOutUser(token, request) {
	const context = getContext(token, request);

	return new Promise((resolve, reject) => {
		Wreck.delete(context.url, context.options, (error, response, payload) => {
			const result = {
				step: 'sign-out',
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
}
