import Ember from 'ember';
import {trackPerf} from 'common/utils/track-perf';
import ResponsiveMixin from '../mixins/responsive';

const {Component, computed, getWithDefault, Logger, $} = Ember;

/**
 * HTMLMouseEvent
 * @typedef {Object} HTMLMouseEvent
 * @extends {MouseEvent}
 * @property {HTMLElement} target
 */

/**
 * DOMStringMap
 * @typedef {Object} DOMStringMap
 * @property {string} galleryRef
 * @property {string} ref
 * @property {string} trackingCategory
 */

/**
 * EventTarget
 * @typedef {Object} EventTarget
 * @property {string} tagName
 */

export default Component.extend(ResponsiveMixin, {
	classNames: ['application-wrapper'],
	classNameBindings: ['smartBannerVisible', 'verticalClass'],
	scrollLocation: null,
	smartBannerVisible: false,
	firstRender: true,
	xxx: {a: 1},
	globalNavigationModel: computed(function () {
		return '{"logo":{"header":{"type":"link-image","href":"http:\/\/fandom.wikia.com","image":"wds-company-logo-fandom-powered-by-wikia","image-data":{"type":"wds-svg","name":"wds-company-logo-fandom-powered-by-wikia"},"title":{"type":"text","value":"Fandom powered by Wikia"},"tracking_label":"logo"},"module":{"type":"logo","main":{"type":"link-image","href":"http:\/\/fandom.wikia.com","image":"wds-company-logo-fandom","image-data":{"type":"wds-svg","name":"wds-company-logo-fandom"},"title":{"type":"text","value":"Fandom powered by Wikia"},"tracking_label":"logo"},"tagline":{"type":"link-image","href":"http:\/\/fandom.wikia.com","image-data":{"type":"wds-svg","name":"wds-company-logo-powered-by-wikia"},"title":{"type":"text","value":"Fandom powered by Wikia"},"tracking_label":"logo-tagline"}}},"search":{"module":{"type":"search","results":{"url":"http:\/\/starwars.wikia.com\/wiki\/Special:Search?fulltext=Search","param-name":"query","tracking_label":"search"},"placeholder-inactive":{"type":"translatable-text","key":"global-navigation-search-placeholder-inactive"},"placeholder-active":{"type":"translatable-text","key":"global-navigation-search-placeholder-in-wiki","params":{"sitename":{"type":"text","value":"Wookieepedia"}}},"suggestions":{"url":"http:\/\/starwars.wikia.com\/index.php?action=ajax&rs=getLinkSuggest&format=json","param-name":"query","tracking_label":"search-suggestion"}}},"create_wiki":{"header":{"type":"link-text","title":{"type":"translatable-text","key":"global-navigation-create-wiki-link-start-wikia"},"href":"http:\/\/www.wikia.com\/Special:CreateNewWiki","tracking_label":"start-a-wiki"}},"fandom_overview":{"links":[{"type":"link-branded","brand":"games","title":{"type":"translatable-text","key":"global-navigation-fandom-overview-link-vertical-games"},"href":"http:\/\/fandom.wikia.com\/games","tracking_label":"link.games"},{"type":"link-branded","brand":"movies","title":{"type":"translatable-text","key":"global-navigation-fandom-overview-link-vertical-movies"},"href":"http:\/\/fandom.wikia.com\/movies","tracking_label":"link.movies"},{"type":"link-branded","brand":"tv","title":{"type":"translatable-text","key":"global-navigation-fandom-overview-link-vertical-tv"},"href":"http:\/\/fandom.wikia.com\/tv","tracking_label":"link.tv"}]},"wikis":{"header":{"type":"line-text","title":{"type":"translatable-text","key":"global-navigation-wikis-header"},"tracking_label":"link.wikis"},"links":[{"type":"link-text","title":{"type":"translatable-text","key":"global-navigation-wikis-explore"},"href":"http:\/\/fandom.wikia.com\/explore","tracking_label":"link.explore"},{"type":"link-text","title":{"type":"translatable-text","key":"global-navigation-wikis-community-central"},"href":"http:\/\/community.wikia.com\/wiki\/Community_Central","tracking_label":"link.community-central"},{"type":"link-text","title":{"type":"translatable-text","key":"global-navigation-wikis-fandom-university"},"href":"http:\/\/community.wikia.com\/wiki\/Fandom_University","tracking_label":"link.fandom-university"}]},"anon":{"header":{"type":"line-image","image":"wds-icons-user","image-data":{"type":"wds-svg","name":"wds-icons-user"},"title":{"type":"translatable-text","key":"global-navigation-anon-my-account"},"subtitle":{"type":"translatable-text","key":"global-navigation-anon-my-account"},"tracking_label":"account"},"links":[{"type":"link-authentication","title":{"type":"translatable-text","key":"global-navigation-anon-sign-in"},"href":"https:\/\/www.wikia.com\/signin","param-name":"redirect","tracking_label":"account.sign-in"},{"type":"link-authentication","title":{"type":"translatable-text","key":"global-navigation-anon-register"},"subtitle":{"type":"translatable-text","key":"global-navigation-anon-register-description"},"href":"https:\/\/www.wikia.com\/register","param-name":"redirect","tracking_label":"account.register"}]}}';
	}),


	drawerContentComponent: computed('activeDrawerContent', function () {
		return `wikia-${this.get('activeDrawerContent')}`;
	}),

	verticalClass: computed(() => {
		const vertical = Ember.get(Mercury, 'wiki.vertical');

		return `${vertical}-vertical`;
	}),

	/**
	 * @returns {void}
	 */
	willInsertElement() {
		$('#preload').remove();
	},

	/**
	 * @returns {void}
	 */
	didRender() {
		if (this.firstRender === true) {
			this.firstRender = false;

			trackPerf({
				name: 'appRendered',
				type: 'mark'
			});
		}
	},

	actions: {
		/**
		 * @param {string} content
		 * @returns {void}
		 */
		setDrawerContent(content) {
			this.set('activeDrawerContent', content);
		},

		closeDrawer() {
			this.set('activeDrawerContent', null);
			this.get('toggleDrawer')(false);
		}
	},

	/**
	 * Necessary because presently, we open external links in new pages, so if we didn't
	 * cancel the click event on the current page, then the mouseUp handler would open
	 * the external link in a new page _and_ the current page would be set to that external link.
	 *
	 * @param {MouseEvent} event
	 * @returns {void}
	 */
	click(event) {
		/**
		 * check if the target has a parent that is an anchor
		 * We do this for links in the form <a href='...'>Blah <i>Blah</i> Blah</a>,
		 * because if the user clicks the part of the link in the <i></i> then
		 * target.tagName will register as 'I' and not 'A'.
		 */
		const $anchor = $(event.target).closest('a'),
			target = $anchor.length ? $anchor[0] : event.target;
		let tagName;

		if (target && this.shouldHandleClick(target)) {
			tagName = target.tagName.toLowerCase();

			if (tagName === 'a' && !(target.hasAttribute('href') && target.getAttribute('href').indexOf('#') === 0)) {
				this.handleLink(target);
				event.preventDefault();
			}
		}
	},

	/**
	 * Determine if we have to apply special logic to the click handler for MediaWiki / UGC content
	 *
	 * @param {EventTarget} target
	 * @returns {boolean}
	 */
	shouldHandleClick(target) {
		const $target = $(target),
			isReference = this.targetIsReference(target);

		return (
			$target.closest('.mw-content').length &&
				// ignore polldaddy content
			!$target.closest('.PDS_Poll').length &&
				// don't need special logic for article references
			!isReference
		);
	},

	/**
	 * Determine if the clicked target is an reference/in references list (in text or at the bottom
	 * of article)
	 *
	 * @param {EventTarget} target
	 * @returns {boolean}
	 */
	targetIsReference(target) {
		const $target = $(target);

		return Boolean(
			$target.closest('.references').length ||
			$target.parent('.reference').length
		);
	},

	/**
	 * @param {HTMLAnchorElement|EventTarget} target
	 * @returns {void}
	 */
	handleLink(target) {
		Logger.debug('Handling link with href:', target.href);

		/**
		 * If either the target or the target's parent is an anchor (and thus target == true),
		 * then also check if the anchor has an href. If it doesn't we assume there is some other
		 * handler for it that deals with it based on ID or something and we just skip it.
		 */
		if (target && target.href) {
			this.sendAction('handleLink', target);
		}
	}
});
