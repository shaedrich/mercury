import Ember from 'ember';
import AlertNotificationsMixin from '../mixins/alert-notifications';
import {track, trackActions} from 'common/utils/track';

export default Ember.Controller.extend(
	AlertNotificationsMixin,
	{
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
		},
	}
);
