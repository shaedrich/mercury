import Ember from 'ember';
import TrackClickMixin from '../mixins/track-click';
import HeadroomMixin from '../mixins/headroom';
import {track, trackActions, trackExperiment} from 'common/utils/track';

export default Ember.Component.extend(
	TrackClickMixin,
	HeadroomMixin,
	{
		classNames: ['nav-ab-test-bottom-bar'],
		headroomOptions: {
			classes: {
				unpinned: 'bottom-unpinned'
			}
		}
	});
