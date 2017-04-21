import Ember from 'ember';
import Notification from './notification';
import request from 'ember-ajax/request';
import {convertToIsoString} from '../../utils/iso-date-time';

const {Object: EmberObject, A, RSVP, Logger, get} = Ember;

const NotificationsModel = EmberObject.extend({
	unreadCount: 0,
	data: new A(),

	getNewestNotificationISODate() {
		return convertToIsoString(this.get('data.0.timestamp'));
	},

	getOldestNotificationISODate() {
		return convertToIsoString(this.get('data.lastObject.timestamp'));
	},

	loadFirstPageReturningNextPageLink() {
		return request(M.getOnSiteNotificationsServiceUrl('/notifications'))
			.then((data) => {
				this.addNotifications(data.notifications);
				return this.getNext(data);
			});
	},

	loadPageReturningNextPageLink(page) {
		return request(M.getOnSiteNotificationsServiceUrl(page), {
			method: 'GET',
		}).then((data) => {
			this.addNotifications(data.notifications);
			return this.getNext(data);
		});
	},

	getNext(data) {
		return get(data, '_links.next') || null;
	},

	markAsRead(notification) {
		if (!notification.isUnread) {
			return RSVP.reject();
		}

		return notification.markAsRead()
			.then(() => {
				this.decrementProperty('unreadCount');
			});
	},

	markAllAsRead() {
		const since = this.getNewestNotificationISODate();

		return request(M.getOnSiteNotificationsServiceUrl(`/notifications/mark-all-as-read`), {
			method: 'POST',
			data: JSON.stringify({since}),
		}).then((data) => {
			this.get('data').setEach('isUnread', false);
			this.set('unreadCount', 0);
		});
	},

	addNotifications(notifications) {
		const notificationModels = notifications.map((notificationApiData) => {
			return Notification.create(notificationApiData);
		});

		this.get('data').pushObjects(notificationModels);
	},

	/**
	 * @private
	 * @param model
	 * @return {Promise.<T>}
	 */
	loadUnreadNotificationCount() {
		return request(M.getOnSiteNotificationsServiceUrl('/notifications/unread-count'))
			.then((result) => {
				this.set('unreadCount', result.unreadCount);
			}).catch((error) => {
				this.set('unreadCount', 0);
				Logger.error('Setting notifications unread count to 0 because of the API fetch error');
			});
	}

});

export default NotificationsModel;
