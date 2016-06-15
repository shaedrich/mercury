import Ember from 'ember';

import DiscussionEditor from './discussion-editor';
import DiscussionEditorOpengraph from '../mixins/discussion-editor-opengraph';
import DiscussionEditorConfiguration from '../mixins/discussion-editor-configuration';

export default DiscussionEditor.extend(DiscussionEditorOpengraph, DiscussionEditorConfiguration, {
	attributeBindings: ['style'],
	classNames: ['discussion-inline-editor'],
	classNameBindings: ['isSticky', 'isActive'],
	tagName: 'form',

	currentUser: Ember.inject.service(),

	isActive: false,
	isSticky: false,
	/**
	 * Set right height for editor placeholder when editor gets sticky
	 *
	 * @returns {Ember.String.htmlSafe}
	 */
	style: Ember.computed('isSticky', function () {
		if (this.get('isSticky')) {
			const editorHeight = this.$('.discussion-inline-editor-floating-container').outerHeight(true);

			return Ember.String.htmlSafe(`height: ${editorHeight}px`);
		}

		return null;
	}),

	/**
	 * @returns {void}
	 */
	onScroll() {
		Ember.run.throttle(
			this,
			function () {
				// It is important to fire the set method only when it's necessary,
				// because it has performance implications
				if (!this.get('isSticky') && this.isStickyBreakpointHeight()) {
					this.set('isSticky', true);
				} else if (this.get('isSticky') && !this.isStickyBreakpointHeight()) {
					this.set('isSticky', false);
				}
			},
			25
		);
	},

	/**
	 * Indicates if the scroll position reached a point where editor should start sticking
	 * @returns {boolean}
	 */
	isStickyBreakpointHeight() {
		return window.pageYOffset >= this.get('offsetTop') - this.get('siteHeadHeight');
	},

	didInsertElement() {
		this._super(...arguments);
		this.initializeStickyState();
	},

	willDestroyElement() {
		Ember.$(window).off('scroll.editor');
	},

	/**
	 * Initialize onScroll binding for sticky logic
	 * @returns {void}
	 */
	initializeStickyState() {
		this.setProperties({
			isSticky: false,
			offsetTop: this.$().offset().top,
			siteHeadHeight: Ember.$('.site-head').outerHeight(true),
		});

		Ember.$(window).on('scroll.editor', this.onScroll.bind(this));
	},

	click() {
		this.sendAction('setEditorActive', 'contributeEditor', true);
	},

	actions: {
		submit() {
			if (!this.get('submitDisabled')) {
				const newDiscussionEntityData = {
					body: this.get('content'),
					creatorId: this.get('currentUser.userId'),
					siteId: Mercury.wiki.id,
				};

				if (this.get('showsOpenGraphCard')) {
					newDiscussionEntityData.openGraph = {
						uri: this.get('openGraph.href')
					};
				}

				this.get('create')(newDiscussionEntityData);
			}
		},
	}
});
