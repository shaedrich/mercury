import Ember from 'ember';
import DiscussionContributor from '../discussion/domain/contributor';
import {notificationTypes} from '../../utils/global-notifications';
import request from 'ember-ajax/request';
import {convertToTimestamp} from '../../utils/iso-date-time'


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
	uri: null,

	markAsRead() {
		return request(M.getOnSiteNotificationsServiceUrl(`/notifications/mark-as-read/by-uri`), {
			method: 'POST',
			data: JSON.stringify([this.get('uri')]),
		}).then(() => {
			this.set('isUnread', false)
		});
	},
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
			uri: Ember.get(notificationData, 'refersTo.uri'),
			timestamp: convertToTimestamp(Ember.get(notificationData, 'events.latestEvent.when')),
			communityName: Ember.get(notificationData, 'community.name'),
			communityId: Ember.get(notificationData, 'community.id'),
			isUnread: notificationData.read === false,
			totalUniqueActors: Ember.get(notificationData, 'events.totalUniqueActors'),
			latestActors: NotificationModel.createActors(Ember.get(notificationData, 'events.latestActors')),
			type: NotificationModel.getTypeFromApiData(notificationData)
		});
	},

	createActors(actors) {
		return actors.reduce(function (array, actor) {
			actor.name = actor.userName;
			array.addObject(DiscussionContributor.create(actor));
			return array;
		}, new A());
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
		} else if(apiData.type === 'announcement-notification') {
			return notificationTypes.announcement;
		}
	}
});

export default NotificationModel;
