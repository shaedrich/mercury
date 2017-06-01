import Ember from 'ember';
import AlertNotificationsMixin from '../mixins/alert-notifications';
import NoScrollMixin from '../mixins/no-scroll';
import {track, trackActions} from 'common/utils/track';

export default Ember.Controller.extend(
	AlertNotificationsMixin, NoScrollMixin,
	{
		smartBannerVisible: false,
		drawerVisible: false,
		drawerContent: null,
		fullPage: false,
		noMargins: false,
		isGlobalNavigationPositionFixed: true,
		isGlobalNavigationHeadroomPinnedOrDisabled: true,
		isGlobalNavigationVisible: Ember.computed.and(
			'isGlobalNavigationPositionFixed',
			'isGlobalNavigationHeadroomPinnedOrDisabled'
		),
		currentUrl: null,

		/**
		 * @returns {void}
		 */
		init() {
			this.setProperties({
				domain: Ember.get(Mercury, 'wiki.dbName') || window.location.href.match(/^https?:\/\/(.*?)\./)[1],
				language: Ember.get(Mercury, 'wiki.language')
			});

			// This event is for tracking mobile sessions between Mercury and WikiaMobile
			// NOTE: this event won't have additional dimensions set up from API, ie. #19 (articleType)
			track({
				action: trackActions.impression,
				category: 'app',
				label: 'load'
			});

			this._super();
		},

		onPathChanged: Ember.observer('target.url', function () {
			Ember.run.next(this, function () {
				this.set('currentUrl', window.location.href);
			});
		}),

		actions: {
			/**
			 * Bubbles up to ApplicationRoute
			 *
			 * @param {HTMLAnchorElement} target
			 * @returns {void}
			 */
			handleLink(target) {
				this.get('target').send('handleLink', target);
			},

			/**
			 * @param {boolean} visible
			 * @returns {void}
			 */
			toggleDrawer(visible) {
				this.set('drawerVisible', visible);
			},

			/**
			 * @param {boolean} visible
			 * @returns {void}
			 */
			toggleSmartBanner(visible) {
				this.set('smartBannerVisible', visible);
			},
		},
	}
);
