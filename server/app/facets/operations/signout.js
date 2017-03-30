import * as authUtils from '../../lib/auth-utils';
import {getInternalHeaders} from '../../lib/utils';
import {getUserId} from './page-data-helper'
import settings from '../../../config/settings';
import Logger from '../../lib/logger';
import Wreck from 'wreck';
import HttpStatus from 'http-status-codes';

function getContext(token, request) {
	return {
		url: authUtils.getHeliosInternalUrl(`/token/${token}`),
		options: {
			headers: getInternalHeaders(request, {
				'X-Wikia-UserId': getUserId(request),
				'Content-type': 'application/json',
			}),
			json: true,
			timeout: settings.helios.timeout
		},
	};
}

/**
 * @param token
 * @param {Hapi.Request} request
 * @returns {Promise}
 */
export default function signOutUser(token, request) {
	const context = getContext(token, request);

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
