import Ember from 'ember';
import NotificationsScrollMenuMixin from '../../mixins/notifications-scroll-menu';
import NotificationsUnreadCount from '../../mixins/notifications-unread-count';
import MarkAllNotificationsMixin from '../../mixins/mark-all-notifications';
import {trackOpenMenu} from '../../utils/notifications-tracker';

const {Component, inject, computed} = Ember;

export default Component.extend(NotificationsScrollMenuMixin, MarkAllNotificationsMixin, NotificationsUnreadCount, {
	notifications: inject.service(),
	notificationsList: computed.oneWay('notifications.model.data'),
	isLoadingNewResults: computed.oneWay('notifications.isLoading'),

	actions: {
		onOpen() {
			trackOpenMenu(this.get('notifications').getUnreadCount());
			this.get('notifications').loadFirstPage();
		}
	}
});
