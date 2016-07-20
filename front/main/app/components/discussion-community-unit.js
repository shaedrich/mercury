import Ember from 'ember';
import {track, trackActions} from '../utils/discussion-tracker';

export default Ember.Component.extend({
	classNames: ['discussion-community-unit'],
	discussionsSplashPageConfig: M.prop('discussionsSplashPageConfig'),
	currentUser: Ember.inject.service(),

	displayWikiaHomeLink: false,
	displayGuidelinesLink: false,

	androidAppLink: Ember.computed('discussionsSplashPageConfig', function () {
		const discussionsSplashPageConfig = this.get('discussionsSplashPageConfig');

		return discussionsSplashPageConfig ? discussionsSplashPageConfig.androidAppLink : null;
	}),

	iosAppLink: Ember.computed('discussionsSplashPageConfig', function () {
		const discussionsSplashPageConfig = this.get('discussionsSplashPageConfig');

		return discussionsSplashPageConfig ? discussionsSplashPageConfig.iosAppLink : null;
	}),

	displayAppPromotion: Ember.computed.or('androidAppLink', 'iosAppLink'),
	wikiName: Ember.computed(function () {
		if (this.get('displayWikiaHomeLink') || this.get('displayGuidelinesLink')) {
			return Ember.get(Mercury, 'wiki.siteName');
		}
	}),

	actions: {

		/**
		 * Tracks guidelines link
		 * @returns {void}
		 */
		openGuidelines() {
			track(trackActions.GuidelinesLinkTapped);
		},
	}
});