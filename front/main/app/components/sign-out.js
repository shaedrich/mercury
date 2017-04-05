import Ember from 'ember';
import {track, trackActions} from 'common/utils/track';

const {Component} = Ember;

export default Component.extend(
	{
		title: 'global-navigation-user-sign-out',
		trackingLabel: 'open-logout',
		classNames: ['wds-sign-out'],
		actions: {
			trackClick() {
				this.get('trackClick')(this.get('trackingLabel'));
			},
		}
	}
);
