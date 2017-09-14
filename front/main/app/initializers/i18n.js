/**
 * If the server loads translations partly and for the rest falls back to EN,
 * we need to find the primary loaded language
 * i18n will handle the EN fallback itself
 *
 * @param {Object} translations
 * @returns {string}
 */
function getPrimaryLoadedLanguage(translations) {
	return Object.keys(translations).filter((code) => {
		return code !== 'en';
	})[0] || 'en';
}

export function initialize() {
	const loadedTranslations = M.prop('translations') || {},
		loadedLanguage = getPrimaryLoadedLanguage(loadedTranslations);

	i18n.init({
		detectLngQS: 'uselang',
		fallbackLng: 'en',
		lng: loadedLanguage,
		lowerCaseLng: true,
		ns: 'main',
		resStore: loadedTranslations,
		useLocalStorage: false,
		interpolationPrefix: '{',
		interpolationSuffix: '}'
	});
}

export default {
	name: 'i18n',
	initialize
};
