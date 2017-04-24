import Ember from 'ember';
import HeadTagsStaticMixin from '../mixins/head-tags-static';
import ResponsiveMixin from '../mixins/responsive';
import {normalizeToUnderscore} from 'common/utils/string';
import {track, trackActions} from 'common/utils/track';
import {activate as variantTestingActivate} from 'common/utils/variant-testing';

const {
	$,
	Logger,
	Route,
	TargetActionSupport,
} = Ember;

export default Route.extend(
	TargetActionSupport,
	HeadTagsStaticMixin,
	ResponsiveMixin,
	{
		actions: {
			/**
			 * @param {boolean} state
			 * @returns {void}
			 */
			triggerHighlightOverlayStateChange(state) {
				this.controller.set('isGlobalNavigationPositionFixed', !state);
			},

			/**
			 * @param {boolean} state
			 * @returns {void}
			 */
			triggerGlobalNavigationHeadroomStateChange(state) {
				this.controller.set('isGlobalNavigationHeadroomPinnedOrDisabled', state);
			},

			/**
			 * @returns {void}
			 */
			loading() {
				if (this.controller) {
					this.controller.set('isLoading', true);
				}
			},

			/**
			 * @returns {void}
			 */
			didTransition() {
				// Activate any A/B tests for the new route
				variantTestingActivate();

				if (this.controller) {
					this.controller.set('isLoading', false);
				}

				// Clear notification alerts for the new route
				this.controller.clearNotifications();

				/*
				 * This is called after the first route of any application session has loaded
				 * and is necessary to prevent the ArticleModel from trying to bootstrap from the DOM
				 */
				M.prop('articleContentPreloadedInDOM', false, true);

				// TODO (HG-781): This currently will scroll to the top even when the app has encountered an error.
				// Optimally, it would remain in the same place.
				window.scrollTo(0, 0);
			},

			/**
			 * @param {*} error
			 * @returns {Boolean}
			 */
			error(error) {
				if (this.controller) {
					this.controller.set('isLoading', false);
				}

				Logger.error('Route error', error);

				return true;
			},

			/**
			 * @param {HTMLAnchorElement} target
			 * @returns {void}
			 */
			handleLink(target) {
				const trackingCategory = target.dataset.trackingCategory;

				/**
				 * Handle tracking
				 */
				if (trackingCategory) {
					track({
						action: trackActions.click,
						category: trackingCategory
					});
				}

				/**
				 * handle links that are external to the application
				 */
				if (target.className.indexOf('external') > -1) {
					return window.location.assign(target.href);
				}

				if (target.href) {
					/**
					 * If it's a jump link or a link to something in a Wikia domain, treat it like a normal link
					 * so that it will replace whatever is currently in the window.
					 * TODO: this regex is alright for dev environment, but doesn't work well with production
					 */
					if (target.href.charAt(0) === '#' || target.href.match(/^https?:\/\/.*\.wikia(\-.*)?\.com.*\/.*$/)) {
						window.location.assign(target.href);
					} else {
						window.open(target.href);
					}
				} else {
					// Reaching this clause means something is probably wrong.
					Logger.error('unable to open link', target.href);
				}
			},

			/**
			 * @returns {void}
			 */
			// TODO link to mobile-wiki
			// loadRandomArticle() {
			// 	this.get('controller').send('toggleDrawer', false);
			//
			// 	ArticleModel
			// 		.getArticleRandomTitle()
			// 		.then((articleTitle) => {
			// 			window.location.assign(M.buildUrl({
			// 				title: normalizeToUnderscore(articleTitle)
			// 			}));
			// 		})
			// 		.catch((err) => {
			// 			this.send('error', err);
			// 		});
			// },

			// We need to proxy these actions because of the way Ember is bubbling them up through routes
			// see http://emberjs.com/images/template-guide/action-bubbling.png
			/**
			 * @returns {void}
			 */
			handleLightbox() {
				this.get('controller').send('handleLightbox');
			},

			/**
			 * @param {string} lightboxType
			 * @param {*} [lightboxModel]
			 * @param {number} [closeButtonDelay]
			 * @returns {void}
			 */
			openLightbox(lightboxType, lightboxModel, closeButtonDelay) {
				this.get('controller').send('openLightbox', lightboxType, lightboxModel, closeButtonDelay);
			},

			/**
			 * @param {string} lightboxType
			 * @param {*} [lightboxModel]
			 * @returns {void}
			 */
			createHiddenLightbox(lightboxType, lightboxModel) {
				this.get('controller').send('createHiddenLightbox', lightboxType, lightboxModel);
			},

			/**
			 * @returns {void}
			 */
			showLightbox() {
				this.get('controller').send('showLightbox');
			},

			/**
			 * @returns {void}
			 */
			closeLightbox() {
				this.get('controller').send('closeLightbox');
			},

			/**
			 * @returns {void}
			 * @param {string} query
			 */
			goToSearchResults(query) {
				if (this.get('responsive.isMobile')) {
					window.location.assign(`/search?query=${query}`);
				} else {
					window.location.assign(M.buildUrl({
						namespace: 'Special',
						title: 'Search',
						query: {
							search: query,
							fulltext: 'Search'
						}
					}));
				}
			},

			openNav() {
				this.get('controller').setProperties({
					drawerContent: 'nav',
					drawerVisible: true
				});
			}
		},
	}
);
