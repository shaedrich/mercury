import Ember from 'ember';

const {Mixin} = Ember;

export default Mixin.create({
	/**
	 * Constructs a localized reply notification body
	 * @param {Ember.Object} model
	 * @returns {string}
	 */
	getReplyMessageBody(model) {
		const hasTitle = model.get('title'),
			totalUniqueActors = model.get('totalUniqueActors'),
			hasTwoUsers = totalUniqueActors === 2,
			hasThreeOrMoreUsers = totalUniqueActors > 2;

		if (hasTitle) {
			if (hasThreeOrMoreUsers) {
				return this.getTranslatedMessage('notifications.replied-by-multiple-users-with-title', {
					username: model.get('latestActors.0.name'),
					postTitle: this.get('postTitleMarkup'),
					mostRecentUser: model.get('latestActors.0.author.name'),
					number: totalUniqueActors - 1
				});
			} else if (hasTwoUsers) {
				return this.getTranslatedMessage('notifications.replied-by-two-users-with-title', {
					firstUser: model.get('latestActors.0.name'),
					secondUser: model.get('latestActors.1.name'),
					postTitle: this.get('postTitleMarkup'),
				});
			} else {
				return this.getTranslatedMessage('notifications.replied-by-with-title', {
					user: model.get('latestActors.0.name'),
					postTitle: this.get('postTitleMarkup'),
				});
			}
		} else {
			if (hasThreeOrMoreUsers) {
				return this.getTranslatedMessage('notifications.replied-by-multiple-users-no-title', {
					username: this.get('usernameMarkup'),
					mostRecentUser: model.get('latestActors.0.name'),
					number: totalUniqueActors - 1
				});
			} else if (hasTwoUsers) {
				return this.getTranslatedMessage('notifications.replied-by-two-users-no-title', {
					firstUser: model.get('latestActors.0.name'),
					secondUser: model.get('latestActors.1.name'),
				});
			} else {
				return this.getTranslatedMessage('notifications.replied-by-no-title', {
					user: model.get('latestActors.0.name'),
				});
			}
		}
	}
});
