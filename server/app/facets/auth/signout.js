import signOutUser from '../operations/signout';
import HttpStatus from 'http-status-codes';
import {getRedirectUrlForPost} from '../../lib/auth-url-factory';
/**
 * @param {Hapi.Request} request
 * @param {*} reply
 * @returns void
 */
export default function post(request, reply) {
	// TODO IRIS-4012: Implement anti-CSRF token
	if (!request.auth.isAuthenticated) {
		reply('Cannot sign out an unauthenticated user.').code(HttpStatus.BAD_REQUEST);
	} else {
		signOutUser(request)
			.then(result => {
				// For redirect Hapi uses 302 status code which should correctly change the method to GET
				reply.redirect(getRedirectUrlForPost(request))
					.state('access_token', result.token)
					.takeover();
			}).catch((result) => {
				reply('Sign out unsuccessful').code(result.status);
			});
	}
}
