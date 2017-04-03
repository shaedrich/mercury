import Ember from 'ember';
import {track, trackActions} from 'common/utils/track';

const {Component} = Ember;

export default Component.extend(
	{
		trackingLabel: 'open-logout',
		classNames: ['wds-sign-out'],
		trackClick: Ember.K,
		actions: {
			onClick() {
				this.get('trackClick')(this.get('trackingLabel'));
			},
		}
	}
);
