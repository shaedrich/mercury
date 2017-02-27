import Ember from 'ember';
import NotificationsScrollMenuMixin from '../../mixins/notifications-scroll-menu';
import NotificationsUnreadCount from '../../mixins/notifications-unread-count';
import MarkAllNotificationsMixin from '../../mixins/mark-all-notifications';

const {Component, inject, computed, observer} = Ember;

export default Component.extend(NotificationsScrollMenuMixin, MarkAllNotificationsMixin, NotificationsUnreadCount, {
	notifications: inject.service(),

	notificationsList: computed.oneWay('notifications.model.data'),

	/**
	 * This is an observer because (most likely) the spinner is not visible immediately, therefore it's not computed.
	 */
	isLoadingNewResults: observer('notifications.isLoading', function() {
		return this.get('notifications.isLoading');
	})

});
