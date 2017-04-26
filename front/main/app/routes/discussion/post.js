import DiscussionBaseRoute from './base';
import DiscussionPostModel from '../../models/discussion/post';
import DiscussionContributionRouteMixin from '../../mixins/discussion-contribution-route';
import DiscussionModerationRouteMixin from '../../mixins/discussion-moderation-route';
import DiscussionModalDialogMixin from '../../mixins/discussion-modal-dialog';

export default DiscussionBaseRoute.extend(
	DiscussionContributionRouteMixin,
	DiscussionModerationRouteMixin,
	DiscussionModalDialogMixin,
	{
		postDeleteFullScreenOverlay: true,

		/**
		 * @param {object} params
		 * @returns {Ember.RSVP.hash}
		 */
		model(params) {
			const indexModel = this.modelFor('discussion');

			return Ember.RSVP.hash({
				current: DiscussionPostModel.find(Mercury.wiki.id, params.postId, params.replyId),
				index: indexModel
			});
		},

		/**
		 * @returns {void}
		 */
		activate() {
			this.controllerFor('application').setProperties({
				// Enables vertical-colored theme bar in site-head component
				themeBar: true,
			});
			this._super();
		},

		/**
		 * @returns {void}
		 */
		deactivate() {
			this.controllerFor('application').setProperties({
				// Disables vertical-colored theme bar in site-head component
				themeBar: false,
			});
			this._super();
		},

		/**
		 * Custom implementation of HeadTagsMixin::setDynamicHeadTags
		 * @param {Object} model, this is model object from route::afterModel() hook
		 * @returns {void}
		 */
		setDynamicHeadTags(model) {
			this._super(model, {
				appArgument: `${Ember.get(Mercury, 'wiki.basePath')}${window.location.pathname}`}
			);
		},

		trackDiscussionsPageView() {
			this._super({
				dis_thread_id: this.modelFor(this.get('routeName')).current.threadId
			});
		},

		actions: {
			/**
			 * Load more replies
			 * @returns {void}
			 */
			loadOlderReplies() {
				this.modelFor(this.get('routeName')).current.loadPreviousPage();
			},

			/**
			 * Load more replies
			 * @returns {void}
			 */
			loadNewerReplies() {
				this.modelFor(this.get('routeName')).current.loadNextPage();
			},

			/**
			 * Refreshes the model
			 * @returns {void}
			 */
			refresh() {
				this.refresh();
			}
		}
	}
);
