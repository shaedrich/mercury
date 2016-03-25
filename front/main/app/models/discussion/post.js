import DiscussionBaseModel from './base';
import DiscussionModerationModelMixin from '../../mixins/discussion-moderation-model';
import ajaxCall from '../../utils/ajax-call';
import DiscussionContributor from './objects/contributor';
import DiscussionContributors from './objects/contributors';
import DiscussionEntities from './objects/entities';
import DiscussionPost from './objects/post';
import DiscussionReply from './objects/reply';
import {track, trackActions} from '../../utils/discussion-tracker';

const DiscussionPostModel = DiscussionBaseModel.extend(DiscussionModerationModelMixin, {
	pivotId: null,
	replyLimit: 10,

	/**
	 * @returns {Ember.RSVP.Promise}
	 */
	loadNextPage() {
		return ajaxCall({
			url: M.getDiscussionServiceUrl(`/${this.wikiId}/threads/${this.postId}`, {
				limit: this.replyLimit,
				page: this.page + 1,
				pivot: this.pivotId,
				responseGroup: 'full',
				sortDirection: 'descending',
				sortKey: 'creation_date',
				viewableOnly: false,
			}),
			success: (data) => {
				// Note that we have to reverse the list we get back because how we're displaying
				// replies on the page; we want to see the newest replies first but show them
				// starting with oldest of the current list at the top.
				const allReplies = Ember.get(data, '._embedded.doc:posts').reverse()
					.map((reply) => DiscussionReply.create(reply))
					.concat(this.get('data.replies'));

				this.get('data').setProperties({
					page: this.get('data.page') + 1,
					replies: allReplies,
				});
			},
			error: (err) => {
				this.handleLoadMoreError(err);
			},
		});
	},

	createReply(replyData) {
		this.setFailedState(null);
		replyData.threadId = this.get('postId');

		return ajaxCall({
			data: JSON.stringify(replyData),
			method: 'POST',
			url: M.getDiscussionServiceUrl(`/${this.wikiId}/posts`),
			success: (reply) => {
				reply.isNew = true;
				this.incrementProperty('postCount');
				this.replies.pushObject(reply);

				track(trackActions.ReplyCreate);
			},
			error: (err) => {
				if (err.status === 401) {
					this.setFailedState('editor.post-error-not-authorized');
				} else {
					this.setFailedState('editor.post-error-general-error');
				}
			}
		});
	},

	setNormalizedData(apiData) {
		const normalizedData = DiscussionPost.createFromThreadData(apiData),
			apiRepliesData = Ember.getWithDefault(apiData, '_embedded.doc:posts', []);

		let contributors,
			normalizedRepliesData,
			pivotId,
			canModerate;

		normalizedRepliesData = DiscussionEntities.createFromPostsData(apiRepliesData);
		canModerate = Ember.getWithDefault(normalizedRepliesData, '0.userData.permissions.canModerate', false);

		if (normalizedRepliesData.length) {
			pivotId = normalizedRepliesData[0].id;

			// See note in previous reverse above on why this is necessary
			normalizedRepliesData.reverse();
		}

		// contributors = DiscussionContributors.create(Ember.get(apiData, '_embedded.contributors[0]'));
		// Work in Progress: szpachla until is SOC-1586 is done
		contributors = DiscussionContributors.create({
			count: apiData.postCount,
			userInfo: normalizedRepliesData.map((reply) => DiscussionContributor.create(reply.createdBy)),
		});

		normalizedData.setProperties({
			canModerate,
			contributors,
			forumId: apiData.forumId,
			page: 0,
			replies: normalizedRepliesData,
			repliesCount: apiData.postCount
		});

		this.setProperties({
			data: normalizedData,
			pivotId
		});
	}
});

DiscussionPostModel.reopenClass({
	/**
	 * @param {number} wikiId
	 * @param {number} postId
	 * @returns {Ember.RSVP.Promise}
	 */
	find(wikiId, postId) {
		const postInstance = DiscussionPostModel.create({
			wikiId,
			postId
		});

		return ajaxCall({
			context: postInstance,
			url: M.getDiscussionServiceUrl(`/${wikiId}/threads/${postId}`, {
				limit: postInstance.replyLimit,
				responseGroup: 'full',
				sortDirection: 'descending',
				sortKey: 'creation_date',
				viewableOnly: false
			}),
			success: (data) => {
				postInstance.setNormalizedData(data);
			},
			error: (err) => {
				postInstance.setErrorProperty(err);
			}
		});
	}
});

export default DiscussionPostModel;
