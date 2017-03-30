import signOutUser from '../operations/signout'
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
		signOutUser(request)
			.then(result => {
				reply('Sign out successful')
					.state('access_token', result.token)
					.code(HttpStatus.OK);
			}).catch((result) => {
				reply('Sign out unsuccessful').code(result.status);
			});
	}
}
