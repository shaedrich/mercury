import Ember from 'ember';
import {track, trackActions} from 'common/utils/track';

const {Component, computed: {reads}} = Ember;

export default Component.extend({
	classNames: ['discussion-left-rail'],

	userProfile: reads('users.0'),

	didInsertElement() {
		this.$().on('click', '[data-tracking-label]', (event) => {
			const label = event.currentTarget.dataset.trackingLabel;

			event.stopPropagation();

			if (!label) {
				return;
			}

			track({
				action: trackActions.click,
				category: 'DesktopWebDiscussions',
				label
			});

		});
	}
});
