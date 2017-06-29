import DiscussionModalDialogMixin from '../mixins/discussion-modal-dialog';
import ResponsiveMixin from '../mixins/responsive';
import {track, trackActions} from '../utils/discussion-tracker';

export default Ember.Component.extend(
	DiscussionModalDialogMixin,
	ResponsiveMixin,
	{
		currentUser: Ember.inject.service(),
		discussionSort: Ember.inject.service(),
		discussionHideDeleted: Ember.inject.service(),
		discussionsLogUrl: Ember.computed('currentUser.name', function () {
			return `${window.location.origin}/wiki/Special:DiscussionsLog?username=${this.get('currentUser.name')}`;
		}),

		showDiscussionsLogLink: Ember.computed.bool('currentUser.permissions.discussions.canViewDiscussionsLogLink'),

		actions: {
			deleteAllPosts() {
				this.get('deleteAllPosts')();

				track(trackActions.DeleteAllTapped);
			}
		}
	}
);
