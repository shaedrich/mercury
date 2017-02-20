import {getReferrerUrlOrDefault} from '../../lib/utils'
import {signOutUser} from '../operations/signout'

/**
 * @param {Hapi.Request} request
 * @param {*} reply
 * @returns {void}
 */
export function get(request, reply) {
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

/**
 * @param {Hapi.Request} request
 * @param {*} reply
 * @returns {void}
 */
export function post(request, reply) {
	const username = querystring.escape(request.payload.username),
		password = querystring.escape(request.payload.password),
		targetUsername = querystring.escape(request.payload.targetUsername);

	return piggybackAsUser(username, password, targetUsername, request)
		.then(data => {
			const accessToken = JSON.parse(data.payload).access_token;
			if (accessToken && accessToken.length) {
				reply.state('access_token', accessToken);
			}
			reply({
				payload: data.payload
			}).code(200);
		}).catch(data => {
			const errors = translateError(data, (error) => {
				let errorHandler = 'server-error';

				if (error.description === 'user_is_blocked') {
					errorHandler = 'username_blocked';
				} else if (error.description === 'user_doesnt_exist') {
					errorHandler = 'username-not-recognized';
				}

				return errorHandler;
			});

			reply({
				errors,
			}).code(data.response ? data.response.statusCode : 500);
		});
}
