import Ember from 'ember';

export default Ember.Component.extend({
	tagName: '',
	notifications: Ember.inject.service(),

	notificationsList: Ember.computed('notifications.data', function () {
		debugger;
		return this.get('notifications.data');
	})
});
