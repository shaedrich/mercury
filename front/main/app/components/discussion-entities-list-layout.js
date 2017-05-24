import Ember from 'ember';
import DiscussionModalDialogMixin from '../mixins/discussion-modal-dialog';
import DiscussionCategoriesVisibilityMixin from '../mixins/discussion-categories-visibility';
import ResponsiveMixin from '../mixins/responsive';

export default Ember.Component.extend(
	DiscussionModalDialogMixin,
	DiscussionCategoriesVisibilityMixin,
	ResponsiveMixin,
	{
		currentUser: Ember.inject.service(),
		discussionSort: Ember.inject.service(),
		discussionToggleDeleted: Ember.inject.service('discussion-toggle-deleted'),

		sortBy: Ember.computed('discussionSort.sortBy', 'isSortingDisabled', function () {
			if (this.get('isSortingDisabled')) {
				return null;
			} else {
				return this.get('discussionSort.sortBy');
			}
		}),

		hideDeleted: Ember.computed.alias('discussionToggleDeleted.hideDeleted'),

		hasNewPostButton: true,

		reportedFilterTopDecoration: Ember.computed.and('categoriesInRail', 'canShowCategories'),

		actions: {
			setSortBy(sortBy) {
				if (this.get('setSortBy')) {
					this.get('setSortBy')(sortBy);
				}
			},
			toggleHideDeleted() {
				this.get('discussionToggleDeleted').toggleHideDeleted();
			}
		}
	}
);
