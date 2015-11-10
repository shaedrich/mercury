/* eslint no-undefined:0 */

/**
 * @class VisitSourceWrapper
 */
export default class VisitSourceWrapper {
	/**
	 * @returns {VisitSource}
	 */
	static get sessionVisitSource() {
		return (typeof VisitSource === 'function') ?
			new VisitSource('WikiaSessionSource', pageParams.cookieDomain) :
			undefined;
	}
	/**
	 * @returns {VisitSource}
	 */
	static get lifetimeVisitSource() {
		return (typeof VisitSource === 'function') ?
			new VisitSource('WikiaLifetimeSource', pageParams.cookieDomain, false) :
			undefined;
	}

	/**
	 * @returns {void}
 	 */
	static init() {
		if (VisitSourceWrapper.sessionVisitSource && VisitSourceWrapper.lifetimeVisitSource) {
			VisitSourceWrapper.sessionVisitSource.checkAndStore();
			VisitSourceWrapper.lifetimeVisitSource.checkAndStore();
		}
	}
}
