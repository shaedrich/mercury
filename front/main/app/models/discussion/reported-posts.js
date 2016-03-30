import DiscussionBaseModel from './base';
import DiscussionModerationModelMixin from '../../mixins/discussion-moderation-model';
import DiscussionForumActionsModelMixin from '../../mixins/discussion-forum-actions-model';
import ajaxCall from '../../utils/ajax-call';
import DiscussionContributor from './domain/contributor';
import DiscussionContributors from './domain/contributors';
import DiscussionEntities from './domain/entities';

const DiscussionReportedPostsModel = DiscussionBaseModel.extend(
	DiscussionModerationModelMixin,
	DiscussionForumActionsModelMixin,
	{
		/**
		 * @param {number} [pageNum=0]
		 * @param {string} [sortBy='trending']
		 *
		 * @returns {Ember.RSVP.Promise}
		 */
		loadPage(pageNum = 0, sortBy = 'trending') {
			this.set('pageNum', pageNum);

			return ajaxCall({
				data: {
					page: this.get('pageNum'),
					pivot: this.get('pivotId'),
					sortKey: this.getSortKey(sortBy),
					viewableOnly: false,
					reported: true
				},
				url: M.getDiscussionServiceUrl(`/${this.wikiId}/posts`),
				success: (data) => {
					this.get('data.entities').pushObjects(
						DiscussionEntities.createFromPostsData(Ember.get(data, '_embedded.doc:posts'))
					);
				},
				error: (err) => {
					this.handleLoadMoreError(err);
				}
			});
		},

		/**
		 * @param {object} apiData
		 *
		 * @returns {void}
		 */
		setNormalizedData(apiData) {
			const posts = Ember.getWithDefault(apiData, '_embedded.doc:posts', []),
				pivotId = Ember.getWithDefault(posts, '0.id', 0),
				// contributors = DiscussionContributors.create(Ember.get(apiData, '_embedded.contributors[0]'));
				// Work in Progress: szpachla until SOC-1586 is done
				contributors = DiscussionContributors.create({
					count: apiData.postCount,
					userInfo: posts.map((post) => DiscussionContributor.create(post.createdBy)),
				}),
				entities = DiscussionEntities.createFromPostsData(posts);

			this.get('data').setProperties({
				canModerate: Ember.getWithDefault(entities, '0.userData.permissions.canModerate', false),
				forumId: Ember.get(Mercury, 'wiki.id'),
				contributors,
				entities,
				pageNum: 0,
				postCount: apiData.postCount,
			});

			this.set('pivotId', pivotId);
		}
	}
);

DiscussionReportedPostsModel.reopenClass({
	/**
	 * @param {number} wikiId
	 * @param {number} forumId
	 * @param {string} [sortBy='trending']
	 *
	 * @returns {Ember.RSVP.Promise}
	 */
	find(wikiId, forumId, sortBy = 'trending') {
		const reportedPostsInstance = DiscussionReportedPostsModel.create({
				wikiId,
				forumId
			}),
			requestData = {
				viewableOnly: false,
				reported: true
			};

		if (sortBy) {
			requestData.sortKey = reportedPostsInstance.getSortKey(sortBy);
		}

		return ajaxCall({
			context: reportedPostsInstance,
			data: requestData,
			url: M.getDiscussionServiceUrl(`/${wikiId}/posts`),
			success: (data) => {
				reportedPostsInstance.setNormalizedData(data);
			},
			error: (err) => {
				reportedPostsInstance.setErrorProperty(err);
			}
		});
	}
});

export default DiscussionReportedPostsModel;
