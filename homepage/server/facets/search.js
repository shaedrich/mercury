/**
 * Wikia (Japan) Homepage
 *
 * @author Per Johan Groland <pgroland@wikia-inc.com>
 */

var util = require('../util');

function companyInfo(request, reply) {
	var data = {
		title: 'ウィキア・ジャパン',
		loading: '検索結果ロード中'
	};

	util.renderWithGlobalData(request, reply, data, 'search', {layout: 'search'});
}

module.exports = companyInfo;
