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
			totalUniqueActors = model.get('totalUniqueActors'),
			hasMultipleUsers = totalUniqueActors > 1,
			user = model.get('latestActors.0');

		if (hasTitle) {
			if (hasMultipleUsers) {
				return this.getTranslatedMessage('notifications.post-upvote-multiple-users-with-title', {
					postTitle: this.get('postTitleMarkup'),
					number: totalUniqueActors - 1
				});
			} else {
				return this.getTranslatedMessage('notifications.post-upvote-single-user-with-title', {
					user: user.name,
					postTitle: this.get('postTitleMarkup'),
				});
			}
		} else {
			if (hasMultipleUsers) {
				return this.getTranslatedMessage('notifications.post-upvote-multiple-users-no-title', {
					number: totalUniqueActors
				});
			} else {
				return this.getTranslatedMessage('notifications.post-upvote-single-user-no-title', {
					user: user.name,
				});
			}
		}
	}
});
