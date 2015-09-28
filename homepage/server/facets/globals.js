/**
 * Wikia (Japan) Homepage
 *
 * @author Per Johan Groland <pgroland@wikia-inc.com>
 */

var util = require('../util');

function globals(request, reply) {
	var loginUrl = util.getLoginUrl(),
		signupUrl = util.getSignupUrl(),
		mobileBreakpoint = util.getMobileBreakpoint(),
		script = 'function getGlobals () {' +
			'	return { ' +
			'		loginUrl: \''  + loginUrl + '\', ' +
			'		signupUrl: \'' + signupUrl + '\', ' +
			'		mobileBreakpoint: \'' + mobileBreakpoint + '\' ' +
			'}}\n';

	return reply(script);
}

module.exports = globals;
