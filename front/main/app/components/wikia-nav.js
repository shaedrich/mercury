import Ember from 'ember';
import LoginLinkMixin from '../mixins/login-link';
import WikiaNavModel from '../models/wikia-nav';
import NoScrollMixin from '../mixins/no-scroll';
import NotificationsUnreadCountMixin from '../mixins/notifications-unread-count';
import {track, trackActions} from 'common/utils/track';

const {Component, computed, inject} = Ember;

export default Component.extend(LoginLinkMixin, NoScrollMixin, NotificationsUnreadCountMixin,
	{
		classNames: ['wikia-nav'],
		classNameBindings: ['model.inRoot:wikia-nav--in-root'],
		currentUser: inject.service(),
		notifications: inject.service(),
		isUserAuthenticated: computed.oneWay('currentUser.isAuthenticated'),
		enableOnSiteNotifications: Ember.get(Mercury, 'wiki.enableOnSiteNotifications'),

		/** TODO: Remove with the feature flag IRIS-4170 */
		logoutLink: M.buildUrl({
			namespace: 'Special',
			title: 'UserLogout'
		}),

		/** TODO: Remove with the feature flag IRIS-4170 */
		userProfileLink: computed('currentUser.name', function () {
			return M.buildUrl({
				namespace: 'User',
				title: this.get('currentUser.name')
			});
		}),

		init() {
			this._super(...arguments);
			this.model = WikiaNavModel.create();
			this.clickHandlers = {
				onRandomPageClick: 'loadRandomArticle'
			};
		},

		didRender() {
			this._super(...arguments);
			this.element.scrollTop = 0;
		},

		actions: {
			/**
			 * Handles link items click, runs handler provided in item object
			 * additionally to tracking and menu reset
			 * @param {Object} item side menu item data
			 * @returns {void}
			 */
			onClick(item) {
				track({
					action: trackActions.click,
					category: item.trackCategory ? item.trackCategory : 'side-nav',
					label: item.trackLabel
				});
				this.get('closeDrawer')();
				// reset state
				this.send('goRoot');
				if (item.actionId) {
					const actionName = this.get(`clickHandlers.${item.actionId}`);

					this.get(actionName)();
				}
			},

			goRoot() {
				this.get('model').goRoot();
			},

			goBack() {
				this.get('model').goBack();
			},

			goToSubNav(index) {
				this.get('model').goToSubNav(index);
			},

			onUsernameClicked() {
				this.send('trackClick', 'side-nav', 'open-user-profile');
				this.sendAction('setDrawerContent', 'user-profile');
			},

			/**
			 * wrapper for click tracking
			 *
			 * @param {string} category
			 * @param {string} label
			 * @returns {void}
			 */
			trackClick(category, label) {
				track({
					action: trackActions.click,
					category,
					label
				});
			}
		}
	}
);
