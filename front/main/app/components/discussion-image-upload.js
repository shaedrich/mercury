import Ember from 'ember';
import DiscussionModalDialogMixin from '../mixins/discussion-modal-dialog';
import DiscussionCategoriesVisibilityMixin from '../mixins/discussion-categories-visibility';
import ResponsiveMixin from '../mixins/responsive';

export default Ember.Component.extend(
	{
		classNames: ['discussion-image-upload'],
		currentUser: Ember.inject.service(),

		actions: {
			upload() {
			},
		}
	}
);
