import Ember from 'ember';

const {Component, computed} = Ember;

export default Component.extend({
	classNames: ['left-rail-user-details'],

	userProfile: computed('users', function () {
		let users = (this.get('users'));
		return users[0];
	}),
});
