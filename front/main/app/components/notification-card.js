import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['notification-card'],

	classNameBindings: ['is-unread'],

	tagName: 'li',

	text: 'I am a totally harmless text!',

	formatters: [],

	iconName: Ember.computed('model.type', function () {
		return this.get('model.type') === 'discussion-reply' ? 'reply' : 'upvote';
	}),

	isUnread: Ember.computed.alias('model.unread'),

	getReplyMessageBody(model) {
		const hasTitle = model.title,
			hasTwoUsers = model.events.length === 2,
			hasThreeOrMoreUsers = model.events.length === 2;

		if (hasTitle) {
			if (hasThreeOrMoreUsers) {
				return;
			} else if (hasTwoUsers) {

			} else {

			}
		} else {
			if (hasThreeOrMoreUsers) {
				return;
			} else if (hasTwoUsers) {

			} else {

			}
		}

	}
});
