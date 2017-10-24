import Ember from 'ember';
import HeadTagsStaticMixin from '../mixins/head-tags-static';
import {track, trackActions} from 'common/utils/track';
import {activate as variantTestingActivate} from 'common/utils/variant-testing';

const {
	Logger,
	Route,
	TargetActionSupport,
} = Ember;

export default Route.extend(
	TargetActionSupport,
	HeadTagsStaticMixin,
	{
		actions: {
			/**
			 * @returns {void}
			 */
			loading() {
				if (this.controller) {
					this.controller.set('isLoading', true);
				}
			},

			/**
			 * @returns {void}
			 */
			didTransition() {
				// Activate any A/B tests for the new route
				variantTestingActivate();

				if (this.controller) {
					this.controller.set('isLoading', false);
				}

				// Clear notification alerts for the new route
				this.controller.clearNotifications();

				// TODO (HG-781): This currently will scroll to the top even when the app has encountered an error.
				// Optimally, it would remain in the same place.
				window.scrollTo(0, 0);
			},

			/**
			 * @param {*} error
			 * @returns {Boolean}
			 */
			error(error) {
				if (this.controller) {
					this.controller.set('isLoading', false);
				}

				Logger.error('Route error', error);

				return true;
			},

			/**
			 * @param {HTMLAnchorElement} target
			 * @returns {void}
			 */
			handleLink(target) {
				const trackingCategory = target.dataset.trackingCategory;

				/**
				 * Handle tracking
				 */
				if (trackingCategory) {
					track({
						action: trackActions.click,
						category: trackingCategory
					});
				}

				/**
				 * handle links that are external to the application
				 */
				if (target.className.indexOf('external') > -1) {
					return window.location.assign(target.href);
				}

				if (target.href) {
					/**
					 * If it's a jump link or a link to something in a Wikia domain, treat it like a normal link
					 * so that it will replace whatever is currently in the window.
					 * TODO: this regex is alright for dev environment, but doesn't work well with production
					 */
					if (target.href.charAt(0) === '#' || target.href.match(/^https?:\/\/.*\.wikia(\-.*)?\.com.*\/.*$/)) {
						window.location.assign(target.href);
					} else {
						window.open(target.href);
					}
				} else {
					// Reaching this clause means something is probably wrong.
					Logger.error('unable to open link', target.href);
				}
			},
		},
	}
);
