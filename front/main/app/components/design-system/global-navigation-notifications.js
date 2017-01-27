import Ember from 'ember';

export default Ember.Component.extend({
	hasUnread: true,
	tagName: '',
	notifications: Ember.inject.service(),

	notificationsList: Ember.computed('notifications.data', function () {
		return this.get('notifications.data');
	})
});
