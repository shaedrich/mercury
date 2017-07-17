import Ember from 'ember';

const {Component, computed: {reads}} = Ember;

export default Component.extend({
	classNames: ['left-rail-user-details'],

	userProfile: reads('users.0')
});
