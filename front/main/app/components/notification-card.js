import Ember from 'ember';
import wrapMeHelper from '../helpers/wrap-me';

export default Ember.Component.extend({
	classNames: ['notification-card'],

	classNameBindings: ['isUnread'],

	tagName: 'li',

	formatters: [],

	currentUser: Ember.inject.service(),
	// use the proper user lang after the translations are merged
	// userLanguage: Ember.computed.oneWay('currentUser.language'),
	userLanguage: 'en',

	iconName: Ember.computed('model.type', function () {
		return this.get('model.type') === 'discussion-reply' ?
			'wds-icons-reply-small' :
			'wds-icons-upvote-small';
	}),

	isUnread: Ember.computed.alias('model.unread'),

	postTitleMarkup: Ember.computed('model.title', function () {
		return wrapMeHelper.compute([
			this.get('model.title')
		], {
			tagName: 'b',
		});
	}),

	postSnippetMarkup: Ember.computed('model.snippet', function () {
		return wrapMeHelper.compute([
			this.get('model.snippet')
		], {
			tagName: 'i',
		});
	}),

	text: Ember.computed('model', function () {
		const model = this.get('model'),
			type = model.type;

		if (type === 'discussion-reply') {
			return this.getReplyMessageBody(model);
		} else if (type === 'discussion-upvote-post') {
			return this.getPostUpvoteMessageBody(model);
		} else {
			return this.getReplyUpvoteMessageBody(model);
		}
	}),

	showAvatars: Ember.computed('model.events.length', 'model.type', function () {
		return this.get('model.events.length') > 2 && this.get('model.type') === 'discussion-reply';
	}),

	authors: Ember.computed('model.events', function () {
		return this.get('model.events').mapBy('author');
	}),

	getTranslatedMessage(key, context) {
		const fullContext = $.extend({}, {
			lng: this.get('userLanguage'),
			ns: 'discussion',
		}, context);

		return i18n.t(key, fullContext);
	},

	getPostUpvoteMessageBody(model) {
		const hasTitle = model.title,
			hasMultipleUsers = model.events.length > 1;

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
	},

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

	getReplyMessageBody(model) {
		const hasTitle = model.title,
			hasTwoUsers = model.events.length === 2,
			hasThreeOrMoreUsers = model.events.length > 2;

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
