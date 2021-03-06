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
		discussionHideDeleted: Ember.inject.service(),

		sortBy: Ember.computed('discussionSort.sortBy', 'isSortingDisabled', function () {
			if (this.get('isSortingDisabled')) {
				return null;
			} else {
				return this.get('discussionSort.sortBy');
			}
		}),

		hideDeleted: Ember.computed.alias('discussionHideDeleted.hideDeleted'),

		hasNewPostButton: true,

		reportedFilterTopDecoration: Ember.computed.and('categoriesInRail', 'canShowCategories'),

		actions: {
			setSortBy(sortBy) {
				if (this.get('setSortBy')) {
					this.get('setSortBy')(sortBy);
				}
			},
			toggleHideDeleted() {
				this.get('discussionHideDeleted').toggleHideDeleted();
				this.get('discussionHideDeleted').applyHideDeleted(true);
			}
		}
	}
);
