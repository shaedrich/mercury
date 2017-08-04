import Ember from 'ember';

/**
 * A helper allowing you to localize numbers in your templates. Usage: {{localize-number 1234}}.
 * If you pass format as the second parameter, it will override the default one
 * @param {Array} params
 * @returns {string}
 */
export default Ember.Helper.extend({
	numeralLocale: Ember.inject.service(),
	onLocaleChange: Ember.observer('numeralLocale.isLoaded', function () {
		this.recompute();
	}),

	/**
	 * Until a local configuration is loaded it returns a raw number and then applies the localization.
	 * @param {number} number
	 * @param {string|null} format See http://numeraljs.com/#format
	 * @returns {number|string}
	 */
	compute([number, format = null]) {
		const numeralLocaleService = this.get('numeralLocale');

		if (format) {
			return numeral(number).format(format);
		} else if (!numeralLocaleService.get('isLoaded')) {
			numeralLocaleService.loadLocale();
			return number;
		} else {
			return numeral(number).format();
		}
	}
});
