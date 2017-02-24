import Ember from 'ember';
import Notification from './notification';
import request from 'ember-ajax/request';
import {convertToIsoString} from '../../utils/iso-date-time'

const {Object, A, RSVP, Logger} = Ember;

const NotificationsModel = Object.extend({
	unreadCount: null,
	data: null,

	getNewestNotificationISODate() {
		return convertToIsoString(this.get('data.0.timestamp'));
	},

	setNormalizedData(apiData) {
		this.setProperties({
			data: new A()
		});

		const notifications = apiData.notifications;

		if (notifications && notifications.length) {
			this.addNotifications(notifications);
		}
	},

	loadMoreResults() {
		const startingTimestamp = this.getNewestNotificationISODate();

		return request(M.getOnSiteNotificationsServiceUrl(`/notifications`), {
			method: 'GET',
			data: {
				startingTimestamp
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

});

NotificationsModel.reopenClass({
	/**
	 * @returns {Ember.RSVP.Promise}
	 */
	getNotifications() {
		const model = NotificationsModel.create();

		return RSVP.all([
			this.getNotificationsList(model),
			this.getUnreadNotificationsCount(model)
		]).then(() => {
			return model;
		});
	},

	getUnreadNotificationsCount(model) {
		return request(M.getOnSiteNotificationsServiceUrl('/notifications/unread-count')).then(function (data) {
			model.set('unreadCount', data.unreadCount);
		}).catch((error) => {
			model.set('unreadCount', 0);
			Logger.error('Setting notifications unread count to 0 because of the API fetch error');
		});
	},

	getNotificationsList(model) {
		return request(M.getOnSiteNotificationsServiceUrl('/notifications')).then((data) => {
			model.setNormalizedData(data);
		});
	}

});

export default NotificationsModel;
