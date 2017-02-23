import Ember from 'ember';
import Notification from './notification';
import request from 'ember-ajax/request';

const {Object, A, RSVP, Logger} = Ember;

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
		});
	},

	markAllAsRead() {
		const since = this.getNewestNotificationISODate();

		return request(M.getOnSiteNotificationsServiceUrl(`/notifications/mark-all-as-read`), {
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
	},

	getUnreadNotificationsCount(notificationsInstance) {
		return request(M.getOnSiteNotificationsServiceUrl('/notifications/unread-count')).then((data) => {
			notificationsInstance.set('unreadCount', data.unreadCount);
		}).catch((error) => {
			notificationsInstance.set('unreadCount', 0);
			Logger.error('Setting notifications unread count to 0 because of the API fetch error');
		});
	},

	getNotificationsList(notificationsInstance) {
		return new RSVP.Promise((resolve, reject) => {
			request(M.getOnSiteNotificationsServiceUrl('/notifications')).then((data) => {
				notificationsInstance.setNormalizedData(data);
				resolve(notificationsInstance);
			}).catch(() => {
				reject(notificationsInstance);
			});
		});
	}
});

NotificationsModel.reopenClass({
	/**
	 * @returns {Ember.RSVP.Promise}
	 */
	getNotifications() {
		const notificationsInstance = NotificationsModel.create();

		return new RSVP.Promise((resolve) => {
			return RSVP.all([
				notificationsInstance.getNotificationsList(notificationsInstance),
				notificationsInstance.getUnreadNotificationsCount(notificationsInstance)
			]).then((data) => {
				resolve(data[0]);
			});
		});

	},
});

export default NotificationsModel;
