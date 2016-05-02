import Ember from 'ember';
import DiscussionEntity from './entity';
import DiscussionContributor from './contributor';
import DiscussionUserData from './user-data';

const DiscussionPost = DiscussionEntity.extend({
	canModerate: null,
	contributors: null,
	forumId: null,
	isNextLink: null,
	isPreviousPage: null,
	pageNum: null,
	permalinkedReplyId: null,
	pivotId: null,
	replies: null,
	repliesCount: null,
	repliesLimit: 10
});

DiscussionPost.reopenClass({
	/**
	 * Normalizes single entity from post list into a post object
	 *
	 * @param {object} postData
	 *
	 * @returns {Ember.Object}
	 */
	createFromPostListData(postData) {
		const post = DiscussionPost.create({
				createdBy: DiscussionContributor.create(postData.createdBy),
				creationTimestamp: postData.creationDate.epochSecond,
				id: postData.id,
				isDeleted: Boolean(postData.isDeleted),
				isLocked: !Boolean(Ember.get(postData, '_embedded.thread.0.isEditable')),
				isNew: Boolean(postData.isNew),
				isReported: Boolean(postData.isReported),
				isRequesterBlocked: Boolean(postData.isRequesterBlocked),
				rawContent: postData.rawContent,
				repliesCount: parseInt(Ember.get(postData, '_embedded.thread.0.postCount'), 10),
				threadId: postData.threadId,
				title: postData.title || '',
				upvoteCount: parseInt(postData.upvoteCount, 10),
			}),
			userData = Ember.get(postData, '_embedded.userData.0');

		if (userData) {
			post.set('userData', DiscussionUserData.create(userData));
		}

		return post;
	},

	/**
	 * Normalizes API thread data into a post object
	 *
	 * @param {object} threadData
	 *
	 * @returns {Ember.Object}
	 */
	createFromThreadData(threadData) {
		const post = DiscussionPost.create({
				createdBy: DiscussionContributor.create(threadData.createdBy),
				creationTimestamp: threadData.creationDate.epochSecond,
				id: threadData.firstPostId,
				isDeleted: Boolean(threadData.isDeleted),
				isLocked: !Boolean(threadData.isEditable),
				isNew: Boolean(threadData.isNew),
				isReported: Boolean(threadData.isReported),
				isRequesterBlocked: Boolean(threadData.isRequesterBlocked),
				permalinkedReplyId: threadData.permalinkedReplyId,
				rawContent: Ember.get(threadData, '_embedded.firstPost.0.rawContent'),
				repliesCount: parseInt(threadData.postCount, 10),
				threadId: threadData.id,
				title: threadData.title || '',
				upvoteCount: parseInt(threadData.upvoteCount, 10),
			}),
			userData = Ember.get(threadData, '_embedded.firstPost.0._embedded.userData.0');

		if (userData) {
			post.set('userData', DiscussionUserData.create(userData));
		}

		return post;
	},
});

export default DiscussionPost;
