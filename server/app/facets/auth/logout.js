import Logger from '../../lib/logger';

/**
 * @param {Hapi.Request} request
 * @param {*} reply
 * @returns {void}
 */
export default function logout(request, reply) {
	// SEC-55: Check if there is anything using this
	Logger.warn({
		message: 'Legacy logout endpoint called via GET',
		referrer: request.info.referrer
	}, 'Legacy logout endpoint called via GET');

	const userLogoutURL = '/wiki/Special:UserLogout';
	reply.redirect(userLogoutURL);
}
