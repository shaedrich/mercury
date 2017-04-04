import signOutUser from '../operations/signout';
import Logger from '../../lib/logger';
import {getRedirectUrlForPost} from '../../lib/auth-url-factory';
/**
 * @param {Hapi.Request} request
 * @param {*} reply
 * @returns void
 */
export default function post(request, reply) {
	// TODO IRIS-4012: Implement anti-CSRF token
	const redirectUrl = getRedirectUrlForPost(request);
	if (!request.auth.isAuthenticated) {
		Logger.warn(`User is not authenticated but sign out has been invoked.
			This may be correct if for example user logged out in another tab.
			Redirecting to target URL anyways.`);
		reply.redirect(redirectUrl).takeover();
	} else {
		signOutUser(request)
			.then(result => {
				// For redirect Hapi uses 302 status code which should correctly change the method to GET
				reply.redirect(redirectUrl)
					.state('access_token', result.token)
					.takeover();
			}).catch((result) => {
			reply('Sign out unsuccessful').code(result.status);
		});
	}
}
