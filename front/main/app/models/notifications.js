import Ember from 'ember';
import Notification from './notification';
import request from 'ember-ajax/request';

const {Object, A, RSVP} = Ember;

const NotificationsModel = Object.extend({
	unreadCount: null,
	data: null,

	setNormalizedData(apiData) {
		this.setProperties({
			unreadCount: apiData.unread,
			data: new A()
		});

		const notifications = apiData.notifications;

		if (notifications && notifications.length) {
			this.addNotifications(apiData.notifications);
		}

		this.data.pushObjects([
			{
				author: {
					avatarUrl: null,
					badgePermission: null,
					id: null,
					name: 'Brtkowal',
					profileUrl: null,
				},
				events: [
					{
						author: {
							avatarUrl: null,
							badgePermission: null,
							id: null,
							name: 'Brtkowal',
							profileUrl: null,
						},
						timestamp: 1485349922140,
					},
					{
						timestamp: 1485349922140,
					}
				],
				type: 'discussion-upvote-reply',
				snippet: 'lalalalala there were a couple of things done and blah blah blah',
				siteName: 'Wookiepedia',
				timestamp: 1485349922140,
			},
		]);
	},

	loadMoreResults() {
		return new RSVP.Promise((resolve) => {
			return resolve();
		});
	},

	markAllAsRead() {
		return new RSVP.Promise((resolve) => {
			return resolve();
		});
	},

	addNotifications(notifications) {
		const notificationModels = notifications.map(function (notificationApiData) {
			return Notification.create(notificationApiData);
		});

		this.get('data').pushObjects(notificationModels);
	}
});

NotificationsModel.reopenClass({
	/**
	 * @returns {Ember.RSVP.Promise}
	 */
	getNotifications() {
		return new RSVP.Promise((resolve) => {
			const notificationsInstance = NotificationsModel.create();

			// request(M.getDiscussionServiceUrl(`/${wikiId}/forums`)).then((data) => {
			// 	discussionInstance.setNormalizedData(data);
			//
			// 	resolve(discussionInstance);
			// }).catch(() => {
			// 	// Categories fail silently - you can still view the default category
			// 	resolve(discussionInstance);
			// });

			notificationsInstance.setNormalizedData();
			return resolve(notificationsInstance);
		});
	}
});

export default NotificationsModel;
