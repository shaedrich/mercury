/* eslint no-console: 0 */
(function () {
	const geoCookie = M.cookie.get('Geo');

	if (geoCookie) {
		M.prop('geo', JSON.parse(geoCookie));
	} else if (M.prop('environment') === 'dev') {
		M.prop('geo', {
			country: 'wikia-dev-country',
			continent: 'wikia-dev-continent'
		});
	} else {
		console.debug('Geo cookie is not set');
	}
})();
