import Ember from 'ember';
import Notification from './notification';
import request from 'ember-ajax/request';

const {Object, A, RSVP} = Ember;

const NotificationsModel = Object.extend({
	unreadCount: null,
	data: null,

	getNewestNotificationISODate() {
		return new Date(this.get('data.0.timestamp')).toISOString();
	},

	setNormalizedData(apiData) {
		this.setProperties({
			unreadCount: apiData.unread,
			data: new A()
		});

		const notifications = apiData.notifications;

		if (notifications && notifications.length) {
			this.addNotifications(notifications);
		}
	},

	loadMoreResults() {
		const since = this.getNewestNotificationISODate();

		return request(M.getOnSiteNotificationsServiceUrl(`/notifications`), {
			method: 'GET',
			data: {
				since
			}
		}).then((data) => {
			this.addNotifications(data.notifications);
			this.get('data').setEach('isUnread', false);
		});
	},

	markAllAsRead() {
		const since = this.getNewestNotificationISODate();

		return request(M.getOnSiteNotificationsServiceUrl(`/notifications`), {
			data: {
				since
			},
		}).then((data) => {
			this.get('data').setEach('isUnread', false);
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

			request(M.getOnSiteNotificationsServiceUrl('/notifications'), {}).then((data) => {
				notificationsInstance.setNormalizedData(data);
				resolve(notificationsInstance);
			}).catch(() => {
				reject(notificationsInstance);
			});
		});
	}
});

export default NotificationsModel;
