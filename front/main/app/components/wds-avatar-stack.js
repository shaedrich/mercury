import Ember from 'ember';

const {Component, computed} = Ember;

export default Component.extend({
	classNames: ['wds-avatar-stack'],

	users: [],
	totalCount: 0,
	displayLimit: 5,

	avatars: computed('users', function () {
		return this.get('users').slice(0, this.get('displayLimit'));
	}),

	avatarOverflow: computed('users', 'totalCount', function () {
		return this.get('totalCount') - this.get('avatars.length');
	}),

	showAvatarOverflow: computed.gt('avatarOverflow', 0)
});
