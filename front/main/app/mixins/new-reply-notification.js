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
					username: this.get('model.author.name'),
					postTitle: this.get('postTitleMarkup'),
					mostRecentUser: this.get('model.events.0.author.name'),
					number: this.get('model.events.length') - 1
				});
			} else if (hasTwoUsers) {
				return this.getTranslatedMessage('notifications.replied-by-two-users-with-title', {
					firstUser: this.get('model.events.0.author.name'),
					secondUser: this.get('model.events.1.author.name'),
					postTitle: this.get('postTitleMarkup'),
				});
			} else {
				return this.getTranslatedMessage('notifications.replied-by-with-title', {
					user: this.get('model.events.0.author.name'),
					postTitle: this.get('postTitleMarkup'),
				});
			}
		} else {
			if (hasThreeOrMoreUsers) {
				return this.getTranslatedMessage('notifications.replied-by-multiple-users-no-title', {
					username: this.get('usernameMarkup'),
					mostRecentUser: this.get('model.events.0.author.name'),
					number: this.get('model.events.length') - 1
				});
			} else if (hasTwoUsers) {
				return this.getTranslatedMessage('notifications.replied-by-two-users-no-title', {
					firstUser: this.get('model.events.0.author.name'),
					secondUser: this.get('model.events.1.author.name'),
				});
			} else {
				return this.getTranslatedMessage('notifications.replied-by-no-title', {
					user: this.get('model.events.0.author.name'),
				});
			}
		}
	}
});
