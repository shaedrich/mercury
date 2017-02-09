import Ember from 'ember';

const {Mixin} = Ember;

export default Mixin.create({
	/**
	 * Constructs a localized reply upvote notification body
	 * @param {Ember.Object} model
	 * @returns {string}
	 */
	getReplyUpvoteMessageBody(model) {
		const hasTitle = model.title,
			hasMultipleUsers = model.events.length > 1;

		if (hasTitle) {
			if (hasMultipleUsers) {
				return this.getTranslatedMessage('notifications.reply-upvote-multiple-users-with-title', {
					postTitle: this.get('postTitleMarkup'),
					number: this.get('model.events.length') - 1
				});
			} else {
				return this.getTranslatedMessage('notifications.reply-upvote-single-user-with-title', {
					user: this.get('model.author.name'),
					postTitle: this.get('postTitleMarkup'),
				});
			}
		} else {
			if (hasMultipleUsers) {
				return this.getTranslatedMessage('notifications.reply-upvote-multiple-users-no-title', {
					number: this.get('model.events.length')
				});
			} else {
				return this.getTranslatedMessage('notifications.reply-upvote-single-user-no-title', {
					user: this.get('model.author.name'),
				});
			}
		}
	},
});
