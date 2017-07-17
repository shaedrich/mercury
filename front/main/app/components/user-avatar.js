import Ember from 'ember';
import {isAnonymousUser} from '../utils/user-utils';

export default Ember.Component.extend({
	classNames: ['user-avatar'],
	profileName: Ember.computed('username', function () {
		const userName = this.get('username') || '';

		return userName.trim();
	}),
	userId: null,
	/**
	 * Returns link to the post author's user page
	 * @returns {string}
	 */
	profileUrl: Ember.computed('profileName', function () {
		return M.buildUrl({
			namespace: 'User',
			title: this.get('profileName'),
		});
	}),
	displayName: Ember.computed('profileName', 'userId', function () {
		return isAnonymousUser(this.get('userId')) ? i18n.t('app.username-anonymous') : this.get('profileName');
	}),
	shouldWrapInHref: Ember.computed('userId', function () {
		return !isAnonymousUser(this.get('userId'));
	})
});
