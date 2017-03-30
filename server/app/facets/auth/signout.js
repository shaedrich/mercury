import {signOutUser} from '../operations/signout'
import HttpStatus from 'http-status-codes'
import Logger from '../../lib/logger';

/**
 * @param {Hapi.Request} request
 * @param {*} reply
 * @returns void
 */
export default function post(request, reply) {
	if (!request.auth.isAuthenticated) {
		reply('Cannot sign out an unauthenticated user.').code(HttpStatus.BAD_REQUEST);
	} else {
		signOutUser(request.state.access_token, request)
			.then(data => {
				const accessToken = JSON.parse(data.payload).access_token;
				Logger.info('access token ' + accessToken);
				reply('Sign out successful')
					.state('access_token', accessToken)
					.code(HttpStatus.OK);
			}).catch((data) => {
				reply('Sign out unsuccessful').code(extractStatusCode(data.response));
			});
	}
}

function extractStatusCode(response) {
	if (response && Number.isInteger(response.statusCode)) {
		return response.statusCode;
	}
	return HttpStatus.INTERNAL_SERVER_ERROR
}
