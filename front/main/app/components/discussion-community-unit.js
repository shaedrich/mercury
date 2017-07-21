import Ember from 'ember';
import {track, trackActions} from '../utils/discussion-tracker';

export default Ember.Component.extend({
	classNames: ['discussion-community-unit'],
	discussionsSplashPageConfig: M.prop('discussionsSplashPageConfig'),
	currentUser: Ember.inject.service(),

	displayGuidelinesLink: false,

	androidAppLink: Ember.computed('discussionsSplashPageConfig', function () {
		const discussionsSplashPageConfig = this.get('discussionsSplashPageConfig');

		return discussionsSplashPageConfig ? discussionsSplashPageConfig.androidAppLink : null;
	}),

	iosAppLink: Ember.computed('discussionsSplashPageConfig', function () {
		const discussionsSplashPageConfig = this.get('discussionsSplashPageConfig');

		return discussionsSplashPageConfig ? discussionsSplashPageConfig.iosAppLink : null;
	}),
	showAppPromotion: true,
	displayAppPromotion: Ember.computed('androidAppLink', 'iosAppLink', 'showAppPromotion', function () {
		return (this.get('androidAppLink') || this.get('iosAppLink')) && this.get('showAppPromotion');
	}),

	/**
	 * TREK INITIATIVE EXPERIMENT
	 *
	 * @returns {boolean}
	 */
	displayMemoryAlphaLink: Ember.computed(() => {
		return Boolean(Ember.get(Mercury, 'wiki.id') === 734209);
	}),

	actions: {

		/**
		 * Tracks guidelines link
		 * @returns {void}
		 */
		openGuidelines() {
			track(trackActions.GuidelinesLinkTapped);
		},

		clickWikiaHomeLink() {
			track(trackActions.WikiHomeLinkClicked);
		}
	}
});
