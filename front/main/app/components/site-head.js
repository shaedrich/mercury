import Ember from 'ember';
import HeadroomMixin from '../mixins/headroom';
import {track, trackActions} from 'common/utils/track';

const {computed, Component} = Ember;

export default Component.extend(
	HeadroomMixin,
	{
		classNames: ['site-head-container'],
		classNameBindings: ['themeBar'],
		tagName: 'div',
		themeBar: false,
		closableDrawerStates: ['nav', 'user-profile'],
		closeIcon: 'close',

		ads: Ember.inject.service(),
		notifications: Ember.inject.service(),

		headroomOptions: {
			classes: {
				initial: 'site-head-headroom',
				pinned: 'site-head-headroom-pinned',
				unpinned: 'site-head-headroom-un-pinned',
				top: 'site-head-headroom-top',
				notTop: 'site-head-headroom-not-top'
			}
		},

		wikiaHomepage: M.prop('globalNavigation.logo.module.main.href') || 'http://fandom.wikia.com',

		displayFandomBar: computed('isSearchPage', function () {
			return Boolean(M.prop('globalNavigation.logo.module.tagline')) && !this.get('isSearchPage');
		}),

		svgName: M.prop('globalNavigation.logo.module.main.image-data.name'),

		navIcon: computed('drawerContent', 'drawerVisible', function () {
			return this.get('drawerVisible') && this.isNavInClosableState() ? 'close' : 'nav';
		}),

		searchIcon: computed('drawerContent', 'drawerVisible', function () {
			return this.get('drawerVisible') && this.get('drawerContent') === 'search' ? 'close' : 'search';
		}),

		offset: computed.readOnly('ads.siteHeadOffset'),

		unreadNotificationsCount: computed.alias('notifications.model.unreadCount'),

		isNavInClosableState() {
			return this.get('closableDrawerStates').indexOf(this.get('drawerContent')) !== -1;
		},

		canBeClosed(clickedIcon) {
			return this.get('drawerVisible')
		},

		actions: {
			/**
			 * @param {String} icon
			 * @returns {void}
			 */
			siteHeadIconClick(icon) {
				if (this.get('drawerVisible') && icon !== 'search') {
					track({
						action: trackActions.click,
						category: 'side-nav',
						label: `${icon}-collapsed`
					});

					this.get('setDrawerContent')(false);
					this.get('toggleDrawer')(false);
				} else {
					track({
						action: trackActions.click,
						category: 'side-nav',
						label: `${icon}-expanded`
					});

					this.get('setDrawerContent')(icon);
					this.get('toggleDrawer')(true);
				}
			},

			/**
			 * @returns {void}
			 */
			trackWordmarkClick() {
				track({
					action: trackActions.click,
					category: 'wordmark'
				});
			}
		}
	}
);
