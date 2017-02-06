import Ember from 'ember';
import NoScrollMixin from '../mixins/no-scroll';
import {track, trackActions} from 'common/utils/track';

const {Component, computed, inject} = Ember;

export default Component.extend(
	NoScrollMixin,
	{
		classNames: ['wikia-user-profile'],
		currentUser: inject.service(),
		notifications: inject.service(),

		notificationsList: computed.oneWay('notifications.data'),

		logoutLink: M.buildUrl({
			namespace: 'Special',
			title: 'UserLogout'
		}),

		userProfileLink: computed('currentUser.name', function () {
			return M.buildUrl({
				namespace: 'User',
				title: this.get('currentUser.name')
			});
		}),

		username: computed.oneWay('currentUser.name'),

		init() {
			this._super(...arguments);
		},

		didRender() {
			this._super(...arguments);
			this.element.scrollTop = 0;
		},

		actions: {
			getBack() {
				this.sendAction('setDrawerContent', 'nav');
			},
		}
	}
);
