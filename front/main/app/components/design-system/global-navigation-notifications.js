import Ember from 'ember';
import NotificationsScrollMenuMixin from '../../mixins/notifications-scroll-menu';

const {Component, inject, computed} = Ember;

export default Component.extend(NotificationsScrollMenuMixin, {
	hasUnread: true,

	notifications: inject.service(),

	notificationsList: computed('notifications.model.data', function () {
		return this.get('notifications.model.data');
	}),

	isLoadingNewResults: computed.oneWay('notifications.isLoading'),
});
