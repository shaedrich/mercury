import Ember from 'ember';
import {track, trackActions} from '../utils/discussion-tracker';
import ResponsiveMixin from '../mixins/responsive';

export default Ember.Component.extend(
	ResponsiveMixin,
	{
		classNames: ['discussion-toggle-deleted'],
		discussionToggleDeleted: Ember.inject.service('discussion-toggle-deleted'),


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
