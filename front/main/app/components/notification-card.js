import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'li',

	text: 'Lorem ipsum gówno',

	formatters: []

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
