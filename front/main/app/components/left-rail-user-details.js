import Ember from 'ember';
import {track, trackActions} from 'common/utils/track';

const {Component, computed: {reads}} = Ember;

export default Component.extend({
	classNames: ['left-rail-user-details'],

	userProfile: reads('users.0'),

	didInsertElement() {
		this.$().on('click', '[data-tracking-label]', (e) => {
			const label = this.$(e.currentTarget).data('tracking-label');

			track({
				action: trackActions.click,
				category: 'DesktopWebDiscussions',
				label: label
			});

			e.stopPropagation();
		});
	}
});
