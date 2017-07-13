import Ember from 'ember';

export default Ember.Component.extend({
	userProfile: Ember.computed('users', function () {
		let users = (this.get('users'));
		return users[0];
	}),
});
