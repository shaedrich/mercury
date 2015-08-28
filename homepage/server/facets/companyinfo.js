/**
 * Wikia (Japan) Homepage
 *
 * @author Per Johan Groland <pgroland@wikia-inc.com>
 */

var util = require('../util');

function companyInfo(request, reply) {
	var data = {
		title: 'ウィキア・ジャパン',
		loggedIn: util.getLoginState(),
		userName: util.getUserName()
	};

	return reply.view('companyinfo', data);
}

module.exports = companyInfo;
