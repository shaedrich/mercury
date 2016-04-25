import Ember from 'ember';
import HeadroomMixin from '../mixins/headroom';
import {track, trackActions} from 'common/utils/track';

const {computed, inject} = Ember;

export default Ember.Component.extend(
	HeadroomMixin,
	{
		classNames: ['site-head', 'border-theme-color'],
		classNameBindings: ['themeBar'],
		tagName: 'nav',
		themeBar: false,
		pinned: true,
		navIcon: 'nav',
		searchIcon: 'search',
		closeIcon: 'close',
		activeIcon: null,

		newFeaturesBadges: inject.service(),

		isNewBadgeVisible: computed.alias('shouldDisplayNewBadge'),
		shouldDisplayNewBadge: computed('newFeaturesBadges.features.[]', 'visibleNavIcon', function () {
			return this.get('newFeaturesBadges').shouldDisplay('recent-wiki-activity')
					&& this.get('visibleNavIcon') !== this.get('closeIcon');
		}),

		visibleNavIcon: Ember.computed('activeIcon', 'navIcon', function() {
			if (this.get('activeIcon') === this.get('navIcon')) {
				return this.get('closeIcon');
			} else {
				return this.get('navIcon');
			}
		}),

		visibleSearchIcon: computed('activeIcon', 'searchIcon', function() {
			if (this.get('activeIcon') === this.get('searchIcon')) {
				return this.get('closeIcon');
			} else {
				return this.get('searchIcon');
			}
		}),

		pinnedObserver: Ember.observer('pinned', function () {
			this.sendAction('toggleSiteHeadPinned', this.get('pinned'));
		}),


		didRender() {
			if (this.get('isNewBadgeVisible')) {
				track({
					action: trackActions.impression,
					category: 'recent-wiki-activity-blue-dot'
				});
			}
		},

		actions: {
			/**
			 * @param {String} icon
			 * @returns {void}
			 */
			siteHeadIconClick(icon) {
				if (icon !== this.get('activeIcon')) {
					if (icon === this.get('navIcon') && this.get('shouldDisplayNewBadge')) {
						track({
							action: trackActions.click,
							category: 'recent-wiki-activity-blue-dot',
							label: 'open-navigation'
						});
					}

					track({
						action: trackActions.click,
						category: 'side-nav',
						label: `${icon}-expanded`
					});

					this.set('activeIcon', icon);
					this.get('setNavigationDrawerContent')(icon);
					this.sendAction('toggleSideNav', true);
				} else {
					track({
						action: trackActions.click,
						category: 'side-nav',
						label: `${icon}-collapsed`
					});

					this.set('activeIcon', null);
					this.sendAction('toggleSideNav', false);
					this.get('setNavigationDrawerContent')(null);
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
