import Ember from 'ember';
import {extractDomainFromUrl} from '../../utils/domain';
import DiscussionContributor from '../discussion/domain/contributor';
import {notificationTypes} from '../../utils/global-notifications';

const {Object, A} = Ember;

const NotificationModel = Object.extend({
	title: null,
	snippet: null,
	timestamp: null,
	communityName: null,
	type: null,
	isUnread: false,
	totalUniqueActors: 1,
	latestActors: [],
	uri: null
});

NotificationModel.reopenClass({
	/**
	 * @param {Object} notificationData
	 *
	 * @returns {array}
	 */
	create(notificationData) {
		return this._super({
			title: Ember.get(notificationData, 'refersTo.title'),
			snippet: Ember.get(notificationData, 'refersTo.snippet'),
			timestamp: NotificationModel.getTimestamp(Ember.get(notificationData, 'events.latestEvent.when')),
			communityName: Ember.get(notificationData, 'community.name'),
			communityId: Ember.get(notificationData, 'community.id'),
			isUnread: notificationData.read === false,
			totalUniqueActors: Ember.get(notificationData, 'events.totalUniqueActors'),
			latestActors: NotificationModel.createActors(Ember.get(notificationData, 'events.latestActors')),
			type: NotificationModel.getTypeFromApiData(notificationData),
			uri: Ember.get(notificationData, 'refersTo.uri')
		});
	},

	createActors(actorsApiData) {
		const actors = new A();

		actors.pushObjects(actorsApiData.map(function (apiActor) {
			apiActor.name = apiActor.userName;
			return DiscussionContributor.create(apiActor);
		}));

		return actors;
	},

	getTimestamp(dateString) {
		return new Date(dateString).getTime();
	},

	getTypeFromApiData(apiData) {
		if (apiData.type === 'upvote-notification') {
			if (apiData.refersTo.type === 'discussion-post') {
				return notificationTypes.discussionUpvoteReply;
			} else {
				return notificationTypes.discussionUpvotePost;
			}
		} else if (apiData.type === 'replies-notification') {
			return notificationTypes.discussionReply;
		}
	}
});

export default NotificationModel;
