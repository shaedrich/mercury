import * as authUtils from '../../lib/auth-utils';
import {getInternalHeaders} from '../../lib/utils';
import {getUserId} from './page-data-helper'
import settings from '../../../config/settings';
import Logger from '../../lib/logger';
import Wreck from 'wreck';
import HttpStatus from 'http-status-codes';

function getContext(token, request, userId) {
	return {
		url: authUtils.getHeliosUrl(`/token/${token}`),
		options: {
			headers: getInternalHeaders(request, {
				'X-Wikia-UserId': userId
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
	const userId = getUserId(request);
	const context = getContext(token, request, userId);
	Logger.info(userId, 'userID');

	return new Promise((resolve, reject) => {
		Wreck.delete(context.url, context.options, (error, response, payload) => {
			const result = {
				step: 'sign-out',
				error,
				response,
				payload
			};
			if (response && response.statusCode === HttpStatus.NO_CONTENT) {
				resolve(result);
			} else {
				Logger.error({
					url: context.url,
					error,
					status: response.statusCode,
					response: JSON.parse(payload)
				}, 'Error from Helios token endpoint.');
				reject(result);
			}
		});
	});
}
