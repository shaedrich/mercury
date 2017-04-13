import Ember from 'ember';
import Notification from './notification';
import request from 'ember-ajax/request';
import {convertToIsoString} from '../../utils/iso-date-time';
import {_notifications, stubbingOn} from '../../utils/stubs';

const {Object: EmberObject, A, RSVP, Logger} = Ember;

const NotificationsModel = EmberObject.extend({
	unreadCount: 0,
	data: new A(),

	getNewestNotificationISODate() {
		return convertToIsoString(this.get('data.0.timestamp'));
	},

	getOldestNotificationISODate() {
		return convertToIsoString(this.get('data.lastObject.timestamp'));
	},

	loadFirstPage() {
		if (stubbingOn) {
			return new RSVP.Promise((cb) => setTimeout(() => cb(_notifications(), 1000)));
		}
		return request(M.getOnSiteNotificationsServiceUrl('/notifications'))
			.then((data) => {
				this.addNotifications(data.notifications);
				return data['_links'].next;
			});
	},

	loadMoreResults(nextPage) {
		return request(M.getOnSiteNotificationsServiceUrl(nextPage), {
			method: 'GET',
		}).then((data) => {
			this.addNotifications(data.notifications);
			return data['_links'].next;
		});
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

});

NotificationsModel.reopenClass({
	/**
	 * @returns {Ember.RSVP.Promise}
	 */
	loadUnreadNotificationCount() {
		const model = NotificationsModel.create();
		return this.getUnreadNotificationsCount(model).then(() => {
			return model;
		});
	},

	/**
	 * @private
	 * @param model
	 * @return {Promise.<T>}
	 */
	getUnreadNotificationsCount(model) {
		return request(M.getOnSiteNotificationsServiceUrl('/notifications/unread-count'))
			.then((result) => {
				model.set('unreadCount', result.unreadCount);
			}).catch((error) => {
				model.set('unreadCount', 0);
				Logger.error('Setting notifications unread count to 0 because of the API fetch error');
			});
	}

});

export default NotificationsModel;
