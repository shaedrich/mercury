import Ember from 'ember';
import {track, trackActions} from 'common/utils/track';

const {Component, computed, inject} = Ember;

export default Component.extend(
	{
		classNames: ['wds-sign-out'],

		currentUrl: null,
		onPathChanged: Ember.observer('target.url', function () {
			Ember.run.next(this, function () {
				this.set('currentUrl', window.location.href);
			});
		}),

		actions: {
			getBack() {
				this.sendAction('setDrawerContent', 'nav');
			},
		}
	}
);
