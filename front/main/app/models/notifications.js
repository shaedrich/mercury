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
		return new RSVP.Promise((resolve, reject) => {
			const notificationsInstance = NotificationsModel.create();

			request(M.getOnSiteNotificationsServiceUrl('/notifications')).then((data) => {
				notificationsInstance.setNormalizedData(data);
				resolve(notificationsInstance);
			}).catch(() => {
				reject(discussionInstance);
			});
		});
	}
});

export default NotificationsModel;
