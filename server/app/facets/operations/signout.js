import * as authUtils from '../../lib/auth-utils';
import {getInternalHeaders} from '../../lib/utils';
import {getUserId, getAccessToken} from './page-data-helper';
import settings from '../../../config/settings';
import Logger from '../../lib/logger';
import Wreck from 'wreck';
import HttpStatus from 'http-status-codes';

function getContext(request) {
	const token = getAccessToken(request),
		userId = getUserId(request);
	return {
		url: authUtils.getHeliosInternalUrl(`/token/${token}`),
		options: {
			headers: getInternalHeaders(request, {
				'X-Wikia-UserId': userId
			}),
			timeout: settings.helios.timeout
		},
	};
}

function extractStatusCode(response) {
	if (response && Number.isInteger(response.statusCode)) {
		return response.statusCode;
	}
	return HttpStatus.INTERNAL_SERVER_ERROR;
}

/**
 * @param token
 * @param {Hapi.Request} request
 * @returns {Promise}
 */
export default function signOutUser(request) {
	const context = getContext(request);
	return new Promise((resolve, reject) => {
		Wreck.delete(context.url, context.options, (error, response, payload) => {
			if (response && response.statusCode === HttpStatus.NO_CONTENT) {
				resolve({token: null});
			} else if (response && response.statusCode === HttpStatus.OK) {
				// we've been piggybacking another user and need to set our original token
				const result = JSON.parse(payload);
				resolve({token: result ? result.access_token : null});
			} else {
				Logger.error({
					url: context.url,
					error,
					status: response.statusCode,
					response: JSON.parse(payload)
				}, 'Error from Helios token endpoint.');
				reject({status: extractStatusCode(response)});
			}
		});
	});
}
