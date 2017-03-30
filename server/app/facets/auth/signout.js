import {signOutUser} from '../operations/signout'
import HttpStatus from 'http-status-codes'

/**
 * @param {Hapi.Request} request
 * @param {*} reply
 * @returns void
 */
export default function post(request, reply) {
	if (!request.auth.isAuthenticated) {
		reply('Cannot sign out an unauthenticated user.').code(HttpStatus.BAD_REQUEST);
	} else {
		signOutUser(request.state('access_token'))
			.then(data => {
				const accessToken = JSON.parse(data.payload).access_token;
				reply('Sign out successful')
					.state('access_token', accessToken)
					.code(HttpStatus.OK);
			}).catch(() => {
				reply('Sign out unsuccessful').code(HttpStatus.INTERNAL_SERVER_ERROR);
			});
	}
}
