import Ember from 'ember';
import NotificationsScrollMenuMixin from '../../mixins/notifications-scroll-menu';
import NotificationsUnreadCount from '../../mixins/notifications-unread-count';
import MarkAllNotificationsMixin from '../../mixins/mark-all-notifications';

const {Component, inject, computed} = Ember;

export default Component.extend(NotificationsScrollMenuMixin, MarkAllNotificationsMixin, NotificationsUnreadCount, {
	notifications: inject.service(),

	notificationsList: computed.oneWay('notifications.model.data'),

	isLoadingNewResults: computed.oneWay('notifications.isLoading'),

	hasUnread: computed.oneWay('notifications.model.data', function() {
		return this.get('notifications.model.data').reduce(
			function (acc, notification) {
				if (notification.isUnread) {
					return acc+1;
				} else {
					return acc;
				}
			}, 0
		) > 0;
	})
});
