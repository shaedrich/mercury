import Ember from 'ember';
import NotificationsScrollMenuMixin from '../../mixins/notifications-scroll-menu';

export default Ember.Component.extend(NotificationsScrollMenuMixin, {
	hasUnread: true,
	notifications: Ember.inject.service(),

	notificationsList: Ember.computed('notifications.model.data', function () {
		return this.get('notifications.model.data');
	}),

	isLoadingNewResults: Ember.computed.oneWay('notifications.isLoading'),
});
