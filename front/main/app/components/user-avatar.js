import Ember from 'ember';
import Thumbnailer from 'common/modules/thumbnailer';
import {isAnonymousUser} from '../utils/user-utils';

const {Component, computed} = Ember;

export default Component.extend({
	classNames: ['user-avatar'],

	userId: null,
	size: 30,

	profileName: computed('username', function () {
		const userName = this.get('username') || '';

		return userName.trim();
	}),

	profileUrl: computed('profileName', function () {
		return M.buildUrl({
			namespace: 'User',
			title: this.get('profileName'),
		});
	}),

	displayName: computed('profileName', 'userId', function () {
		return isAnonymousUser(this.get('userId')) ? i18n.t('app.username-anonymous') : this.get('profileName');
	}),

	shouldWrapInHref: computed('userId', function () {
		return !isAnonymousUser(this.get('userId'));
	}),

	avatarThumbnail: computed('avatarUrl', 'size', function () {
		const size = this.get('size');

		return Thumbnailer.getThumbURL(
			this.get('avatarUrl'),
			{
				mode: Thumbnailer.mode.fixedAspectRatioDown,
				height: size,
				width: size
			}
		);
	})
});
