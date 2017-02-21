import Ember from 'ember';

const {Mixin} = Ember;

export default Mixin.create({
	/**
	 * Constructs a localized post upvote notification body
	 * @param {Ember.Object} model
	 * @returns {string}
	 */
	getPostUpvoteMessageBody(model) {
		const hasTitle = model.get('title'),
			hasMultipleUsers = model.get('totalUniqueActors') > 1;

		if (hasTitle) {
			if (hasMultipleUsers) {
				return this.getTranslatedMessage('notifications.post-upvote-multiple-users-with-title', {
					postTitle: this.get('postTitleMarkup'),
					number: this.get('model.events.length') - 1
				});
			} else {
				return this.getTranslatedMessage('notifications.post-upvote-single-user-with-title', {
					user: this.get('model.author.name'),
					postTitle: this.get('postTitleMarkup'),
				});
			}
		} else {
			if (hasMultipleUsers) {
				return this.getTranslatedMessage('notifications.post-upvote-multiple-users-no-title', {
					number: this.get('model.events.length')
				});
			} else {
				return this.getTranslatedMessage('notifications.post-upvote-single-user-no-title', {
					user: this.get('model.author.name'),
				});
			}
		}
	}
});
