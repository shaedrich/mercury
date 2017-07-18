import Ember from 'ember';
import {track, trackActions} from 'common/utils/track';

const {Component, computed: {reads}} = Ember;

export default Component.extend({
	classNames: ['left-rail-user-details'],

	userProfile: reads('users.0'),

	didInsertElement() {
		this.$().on('click', '[data-tracking-label]', (event) => {
			track({
				action: trackActions.click,
				category: 'DesktopWebDiscussions',
				label: event.currentTarget.dataset.trackingLabel
			});

			event.stopPropagation();
		});
	}
});
