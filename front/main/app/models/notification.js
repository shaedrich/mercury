import Ember from 'ember';
import {extractDomainFromUrl} from '../utils/domain';
import DiscussionContributor from './discussion/domain/contributor';

const {Object, A} = Ember;

const NotificationModel = Object.extend({
	author: null,
	title: null,
	textSnippet: null,
	timestamp: null,
	communityName: null,
	type: null,
	threadId: null,
	siteId: null,
	replyId: null
});

NotificationModel.reopenClass({
	/**
	 * @param {Object} notificationData
	 *
	 * @returns {array}
	 */
	create(notificationData) {
		return this._super({
			author: DiscussionContributor.create(notificationData.author),
			title: Ember.get(notificationData, 'refersTo.title'),
			textSnippet: Ember.get(notificationData, 'refersTo.textSnippet'),
			timestamp: NotificationModel.getTimestamp(Ember.get(notificationData, 'events.latestEvent.timestamp')),
			communityName: Ember.get(notificationData, 'community.name'),
			communityId: Ember.get(notificationData, 'community.id'),
			isUnread: notificationData.read === false,
			totalUniqueActors: Ember.get(notificationData, 'events.totalUniqueActors'),
			latestActors: NotificationModel.createActors(notificationData.events.latestActors),
			type: NotificationModel.getTypeFromApiData(notificationData),
			threadId: notificationData.threadId,
			siteId: notificationData.siteId,
			replyId: notificationData.replyId,
			uri: Ember.get(notificationData, 'refersTo.uri')
		});
	},

	createActors(actorsApiData) {
		const actors = new A();

		actors.pushObjects(actorsApiData.map(function (apiActor) {
			return DiscussionContributor.create(apiActor.userInfo);
		}))
	},

	getTimestamp(dateString) {
		return new Date(dateString).getTime();
	},

	getTypeFromApiData(apiData) {
		if (apiData.type === 'upvote-notification') {
			if (apiData.refersTo.type === 'discussion-post') {
				return 'discussion-upvote-reply';
			} else {
				return 'discussion-upvote-post';
			}
		} else if (apiData.type === 'reply-notification') {
			return 'discussion-reply';
		}
	}
});

export default NotificationModel;
