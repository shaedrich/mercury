import Ember from 'ember';
import {track, trackActions} from '../utils/discussion-tracker';
import ResponsiveMixin from '../mixins/responsive';

export default Ember.Component.extend(
	ResponsiveMixin,
	{
		classNames: ['discussion-hide-deleted'],
		discussionHideDeleted: Ember.inject.service(),

		actions: {
			/**
			 * @returns {void}
			 */
			toggleHideDeleted() {
				this.get('toggleHideDeleted')();
			}
		}
	}
);
