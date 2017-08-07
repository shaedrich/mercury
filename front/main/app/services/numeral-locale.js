import Ember from 'ember';

export default Ember.Service.extend({
	currentUser: Ember.inject.service(),
	defaultLanguage: 'en',
	isLoaded: false,
	isLoading: false,
	// Path to all supported locales, so they can be fingerprinted
	localePath: {
		de: '/front/main/assets/vendor/numeral/de.js',
		es: '/front/main/assets/vendor/numeral/es.js',
		fr: '/front/main/assets/vendor/numeral/fr.js',
		it: '/front/main/assets/vendor/numeral/it.js',
		ja: '/front/main/assets/vendor/numeral/ja.js',
		pl: '/front/main/assets/vendor/numeral/pl.js',
		'pt-br': '/front/main/assets/vendor/numeral/pt-br.js',
		ru: '/front/main/assets/vendor/numeral/ru.js',
		'zh-cn': '/front/main/assets/vendor/numeral/zh-cn.js',
		'zh-tw': '/front/main/assets/vendor/numeral/zh-tw.js'
	},
	/**
	 * Changes status of downloading numeral's locale to trigger helper's observers
	 *
	 * @param {boolean} done
	 * @return {void}
	 */
	changeLoadingStatus(done = true) {
		this.setProperties({
			isLoaded: done,
			isLoading: !done
		});
	},
	/**
	 * Changes numeral locale. By default it's English which is always preloaded.
	 *
	 * @param {string} [locale='en']
	 * @return {void}
	 */
	setLocale(locale = 'en') {
		numeral.locale(locale);

		// Patch locales for consistency with MediaWiki
		switch (locale) {
			case 'de':
				numeral.locales.de.delimiters.thousands = '.';
				break;
			case 'it':
				numeral.locales.it.delimiters.thousands = ' ';
				break;
			case 'pt-br':
				numeral.locales['pt-br'].delimiters.thousands = ' ';
				break;
			default:
				break;
		}

		this.changeLoadingStatus();
	},
	/**
	 * Downloads locale for numeral if content language is not en, otherwise just changes to en
	 *
	 * @return {void}
	 */
	loadLocale() {
		if (!this.get('isLoading')) {
			const contentLanguage = Ember.get(Mercury, 'wiki.language.content'),
				lang = this.localePath.hasOwnProperty(contentLanguage) ? contentLanguage : this.defaultLanguage;

			this.changeLoadingStatus(false);

			if (lang === 'en') {
				this.setLocale();
			} else {
				Ember.$.getScript(this.localePath[lang]).done(() => {
					this.setLocale(lang);
				}).fail((jqxhr, settings, exception) => {
					Ember.Logger.error(`Can't get numeral translation for ${lang} | ${exception}`);
					this.setLocale();
				});
			}
		}
	}
});
