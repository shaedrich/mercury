import Ember from 'ember';
import DiscussionStickyComponentMixin from '../mixins/discussion-sticky-component';

const {Component, inject} = Ember;

export default Component.extend(
	DiscussionStickyComponentMixin,
	{
		classNames: ['discussion-reply-editor-entry-point'],
		containerSelector: '.discussion-editor-entry-point-container',

		currentUser: inject.service(),

		click() {
			this.sendAction('setEditorActive', 'contributeEditor', true);
		}
	}
);
