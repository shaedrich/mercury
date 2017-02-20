import {getReferrerUrlOrDefault} from '../../lib/utils'
import {signOutUser} from '../operations/signout'

/**
 * @param {Hapi.Request} request
 * @param {*} reply
 * @returns {void}
 */
export default function signOut(request, reply) {
	if (request.auth.isAuthenticated) {
		return signOutUser(request.state('access_token'))
			.then(data => {
				const accessToken = JSON.parse(data.payload).access_token;
				reply.state('access_token', accessToken);
				reply.redirect(getReferrerUrlOrDefault(request)).takeover();
			}).catch(data => {
				reply.redirect(getReferrerUrlOrDefault(request)).takeover();
			});
	} else {
		return reply.redirect(getReferrerUrlOrDefault(request)).takeover();
	}
}
