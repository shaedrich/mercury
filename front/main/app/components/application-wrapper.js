import Ember from 'ember';
import {trackPerf} from 'common/utils/track-perf';
import ResponsiveMixin from '../mixins/responsive';

const {Component, computed, Logger, $, observer} = Ember;

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

	drawerContentComponent: computed('activeDrawerContent', function () {
		return `wikia-${this.get('activeDrawerContent')}`;
	}),

	verticalClass: computed(() => {
		const vertical = Ember.get(Mercury, 'wiki.vertical');

		return `${vertical}-vertical`;
	}),

	viewChangeObserver: observer('responsive.isMobile', function () {
		// Deregister click handlers for open discussion-dropdown components
		this.$(window.document).off('click');
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
