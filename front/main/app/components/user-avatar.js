import Ember from 'ember';

const {Component, computed} = Ember;

export default Component.extend({
	classNames: ['user-avatar'],

	shouldWrapInHref: true,

	profileName: computed('username', function () {
		const userName = this.get('username') || '';

		return userName.trim();
	}),

	/**
	 * Returns link to the post author's user page
	 * @returns {string}
	 */
	profileUrl: computed('profileName', function () {
		return M.buildUrl({
			namespace: 'User',
			title: this.get('profileName'),
		});
	}),

	displayName: computed('profileName', function () {
		return this.get('anonymous') ? i18n.t('app.username-anonymous') : this.get('profileName');
	})
});
