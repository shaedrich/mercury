/**
 * @typedef {Object} TrackerOptions
 * @property {string} name
 * @property {boolean} allowLinker
 * @property {number} sampleRate
 */

/**
 * @typedef {string|function} UniversalAnalyticsDimension
 */

/**
 * @typedef {Object} GAAccount
 * @property {string} id
 * @property {string} [prefix]
 * @property {number} sampleRate
 */

/**
 * @class UniversalAnalytics
 *
 * @property {(string|Function)[]} dimensions
 * @property {GAAccount[]} tracked
 * @property {GAAccountMap} accounts
 * @property {string} accountPrimary
 * @property {string} accountSpecial
 * @property {boolean} dimensionsSynced - are dimensions synced (sent to UA)
 * @property {string} accountAds
 */
class UniversalAnalytics {
	/**
	 * @param {boolean} [isSpecialWiki=false]
	 * @returns {void}
	 */
	constructor(isSpecialWiki = false) {
		this.tracked = [];
		this.accountPrimary = 'primary';
		this.accountSpecial = 'special';
		this.accountAds = 'ads';
		this.dimensionsSynced = false;

		if (!UniversalAnalytics.dimensions.length) {
			throw new Error(
				'Cannot instantiate UA tracker: please provide dimensions using UniversalAnalytics#setDimensions'
			);
		}

		// All domains that host content for Wikia
		// Use one of the domains below. If none matches, the tag will fall back to
		// the default which is 'auto', probably good enough in edge cases.
		const domain = [
			'wikia.com', 'ffxiclopedia.org', 'jedipedia.de',
			'marveldatabase.com', 'memory-alpha.org', 'uncyclopedia.org',
			'websitewiki.de', 'wowwiki.com', 'yoyowiki.org'
		].filter((domain) => document.location.hostname.indexOf(domain) > -1)[0];

		this.accounts = M.prop('tracking.ua');

		this.initAccount(this.accountPrimary, domain);
		this.initAccount(this.accountAds, domain);

		if (isSpecialWiki) {
			this.initAccount(this.accountSpecial, domain);
		}
	}

	/**
	 * Syncs dimensions for all trackers - sends dimensions to UA trackers
	 *
	 * This function is being executed before each track and page view events.
	 * It checks if there were any changes to `UniversalAnalytics.dimensions`
	 * and it sends dimensions to all Universal Analytics tracker when necessary.
	 *
	 * That allows us to set dimensions in an initializer and fill the remaining
	 * values later, ie. from the API.
	 *
	 * @returns {void}
	 */
	syncDimensions() {
		if (!UniversalAnalytics.dimensionsSynced) {
			this.tracked.forEach((account) => {
				const prefix = UniversalAnalytics.getPrefix(account);

				UniversalAnalytics.dimensions.forEach((dimension, idx) => {
					ga(`${prefix}set`, `dimension${idx}`, UniversalAnalytics.getDimension(idx));
				});
			});

			UniversalAnalytics.dimensionsSynced = true;
		}
	}

	/**
	 * Synchronously sets the UA dimensional context
	 *
	 * @param {UniversalAnalyticsDimension[]} dimensions - array of dimensions to set, may be strings or functions
	 * @param {boolean} [overwrite] - set to true to overwrite all preexisting dimensions and unset ones not declared
	 * @returns {boolean} true if dimensions were successfully set
	 */
	static setDimensions(dimensions, overwrite) {
		if (!dimensions.length) {
			return false;
		}

		if (overwrite === true) {
			UniversalAnalytics.dimensions = dimensions;
		} else {
			$.extend(UniversalAnalytics.dimensions, dimensions);
		}

		UniversalAnalytics.dimensionsSynced = false;

		return true;
	}

	/**
	 * Set the UA dimension value
	 *
	 * @param {number} dimension
	 * @param {*} value
	 * @returns {void}
	 */
	static setDimension(dimension, value) {
		UniversalAnalytics.dimensions[dimension] = String(value);
		UniversalAnalytics.dimensionsSynced = false;
	}

	/**
	 * Retrieves string value or invokes function for value
	 *
	 * @param {number} idx - index of dimension
	 * @returns {string}
	 */
	static getDimension(idx) {
		const dimension = UniversalAnalytics.dimensions[idx];

		return typeof dimension === 'function' ? dimension() : dimension;
	}

	/**
	 * Initialize an additional account or property
	 *
	 * @param {string} trackerName - The name of the account as specified in localSettings
	 * @param {string} domain
	 * @returns {void}
	 */
	initAccount(trackerName, domain) {
		const gaUserIdHash = M.prop('gaUserIdHash') || '',
			options = {
				name: '',
				allowLinker: true,
				sampleRate: this.accounts[trackerName].sampleRate,
				userId: (gaUserIdHash.length > 0 ? gaUserIdHash : null)
			};

		let prefix = '',
			trackerPrefix;

		// Primary account should not have a namespace prefix
		if (trackerName !== this.accountPrimary) {
			trackerPrefix = this.accounts[trackerName].prefix;
			prefix = `${trackerPrefix}.`;
			options.name = trackerPrefix;
		}

		UniversalAnalytics.setupAccountOnce(this.accounts[trackerName].id, prefix, options);

		if (domain) {
			ga(`${prefix}linker:autoLink`, domain);
		}

		this.tracked.push(this.accounts[trackerName]);
	}

	/**
	 * We create new tracker instance every time mercury/utils/track #track or #trackPageView is called
	 * Google wants us to call methods below just once per account
	 *
	 * @param {string} id
	 * @param {string} prefix
	 * @param {Object} options
	 * @returns {void}
	 */
	static setupAccountOnce(id, prefix, options) {
		if (UniversalAnalytics.createdAccounts.indexOf(id) === -1) {
			ga('create', id, 'auto', options);
			ga(`${prefix}require`, 'linker');

			UniversalAnalytics.createdAccounts.push(id);
		}
	}

	/**
	 * Returns proper prefix for given account
	 *
	 * @param {GAAccount} account
	 * @returns {string}
	 */
	static getPrefix(account) {
		return account.prefix ? `${account.prefix}.` : '';
	}

	/**
	 * Tracks an event, using the parameters native to the UA send() method
	 *
	 * @see {@link https://developers.google.com/analytics/devguides/collection/analyticsjs/method-reference}
	 *
	 * @param {string} category - Event category.
	 * @param {string} action - Event action.
	 * @param {string} label - Event label.
	 * @param {number} value - Event value. Has to be an integer.
	 * @param {boolean} nonInteractive - Whether event is non-interactive.
	 * @returns {void}
	 */
	track(category, action, label, value, nonInteractive) {
		this.syncDimensions();

		this.tracked.forEach((account) => {
			// skip over ads tracker (as it's handled in self.trackAds)
			if (account.prefix !== this.accountAds) {
				const prefix = UniversalAnalytics.getPrefix(account);

				ga(
					`${prefix}send`,
					{
						hitType: 'event',
						eventCategory: category,
						eventAction: action,
						eventLabel: label,
						eventValue: value,
						nonInteraction: nonInteractive
					}
				);
			}
		});
	}

	/**
	 * Tracks an ads-related event
	 * @see {@link https://developers.google.com/analytics/devguides/collection/analyticsjs/method-reference}
	 *
	 * @param {string} category - Event category.
	 * @param {string} action - Event action.
	 * @param {string} label - Event label.
	 * @param {number} value - Event value. Has to be an integer.
	 * @param {boolean} nonInteractive - Whether event is non-interactive.
	 * @returns {void}
	 */
	trackAds(category, action, label, value, nonInteractive) {
		this.syncDimensions();

		ga(
			`${this.accounts[this.accountAds].prefix}.send`,
			{
				hitType: 'event',
				eventCategory: category,
				eventAction: action,
				eventLabel: label,
				eventValue: value,
				nonInteraction: nonInteractive
			}
		);
	}

	/**
	 * Updates current page
	 *
	 * from https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications :
	 * Note: if you send a hit that includes both the location and page fields and the path values are different,
	 * Google Analytics will use the value specified for the page field.
	 *
	 * @param {string} url
	 * @returns {void}
	 */
	updateTrackedUrl(url) {
		const location = document.createElement('a');

		location.href = url;

		this.tracked.forEach((account) => {
			const prefix = UniversalAnalytics.getPrefix(account);

			ga(`${prefix}set`, 'page', location.pathname);
		});
	}

	/**
	 * Tracks the current page view
	 *
	 * @returns {void}
	 */
	trackPageView() {
		if (!UniversalAnalytics.getDimension(8)) {
			throw new Error('missing page type dimension (#8)');
		}
		this.syncDimensions();

		this.tracked.forEach((account) => {
			const prefix = UniversalAnalytics.getPrefix(account);

			ga(`${prefix}send`, 'pageview');
		});
	}
}

UniversalAnalytics.dimensions = [];
UniversalAnalytics.createdAccounts = [];

export default UniversalAnalytics;