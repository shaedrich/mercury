import Ember from 'ember';
import Ads from 'common/modules/ads';
import InViewportMixin from 'ember-in-viewport';

const {Component, computed, Logger} = Ember;

export default Component.extend(
	InViewportMixin,
	{
		classNames: ['ad-slot-wrapper'],
		classNameBindings: ['nameLowerCase', 'noAds'],
		// This component is created dynamically, and this won't work without it
		layoutName: 'components/ad-slot',
		adsState: Ember.inject.service(),
		noAds: Ember.computed.readOnly('adsState.noAds'),
		disableManualInsert: false,
		isAboveTheFold: false,
		name: null,

		nameLowerCase: computed('name', function () {
			return Ember.String.dasherize(this.get('name').toLowerCase());
		}),

		onElementManualInsert: Ember.on('didInsertElement', function () {
			const ads = Ads.getInstance(),
				name = this.get('name');

			if (this.get('disableManualInsert')) {
				return;
			}

			if (this.get('noAds')) {
				Logger.info('Ad disabled for:', name);
				return;
			}

			if (['MOBILE_TOP_LEADERBOARD', 'MOBILE_IN_CONTENT', 'MOBILE_PREFOOTER'].indexOf(this.get('name')) > -1) {
				Logger.info('Injected ad', name);
				ads.addSlot(name);
			} else {
				ads.pushSlotToQueue(name);
			}

			Ember.setProperties(this, {
				viewportTolerance: {
					top: 200,
					bottom: 200
				}
			});
		}),

		/**
		 * @returns {void}
		 */
		didEnterViewport() {
			const ads = Ads.getInstance(),
				name = this.get('name');

			if (this.get('noAds')) {
				Logger.info('Ad disabled for:', name);
				return;
			}
		},

		/**
		 * @returns {void}
		 */
		willDestroyElement() {
			const name = this.get('name');

			Ads.getInstance().removeSlot(name);
			this.$().remove();
			Logger.info('Will destroy ad:', name);
		}
	}
);
