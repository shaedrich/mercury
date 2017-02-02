import Ember from 'ember';
import wrapMeHelper from '../helpers/wrap-me';

export default Ember.Component.extend({
	classNames: ['notification-card'],

	classNameBindings: ['isUnread'],

	tagName: 'li',

	formatters: [],

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
		}
	}),

	getPostUpvoteMessageBody(model) {
		const hasTitle = model.title,
			hasMultipleUsers = model.events.length > 1;

		if (hasTitle) {
			if (hasMultipleUsers) {
				return i18n.t('notifications.post-upvote-multiple-users-with-title', {
					ns: 'discussion',
					postTitle: this.get('postTitleMarkup'),
					number: this.get('model.events.length') - 1
				});
			} else {
				return i18n.t('notifications.post-upvote-single-user-with-title', {
					ns: 'discussion',
					user: this.get('model.author.name'),
					postTitle: this.get('postTitleMarkup'),
				});
			}
		} else {
			if (hasMultipleUsers) {
				return i18n.t('notifications.post-upvote-multiple-users-no-title', {
					ns: 'discussion',
					number: this.get('model.events.length')
				});
			} else {
				return i18n.t('notifications.post-upvote-single-user-no-title', {
					ns: 'discussion',
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
				return i18n.t('notifications.replied-by-multiple-users-with-title', {
					ns: 'discussion',
					username: this.get('model.author.name'),
					postTitle: this.get('postTitleMarkup'),
					mostRecentUser: this.get('model.events.0.author.name'),
					number: this.get('model.events.length') - 1
				});
			} else if (hasTwoUsers) {
				return i18n.t('notifications.replied-by-two-users-with-title', {
					ns: 'discussion',
					firstUser: this.get('model.events.0.author.name'),
					secondUser: this.get('model.events.1.author.name'),
					postTitle: this.get('postTitleMarkup'),
				});
			} else {
				return i18n.t('notifications.replied-by-with-title', {
					ns: 'discussion',
					user: this.get('model.events.0.author.name'),
					postTitle: this.get('postTitleMarkup'),
				});
			}
		} else {
			if (hasThreeOrMoreUsers) {
				return i18n.t('notifications.replied-by-multiple-users-no-title', {
					ns: 'discussion',
					username: this.get('usernameMarkup'),
					mostRecentUser: this.get('model.events.0.author.name'),
					number: this.get('model.events.length') - 1
				});
			} else if (hasTwoUsers) {
				return i18n.t('notifications.replied-by-two-users-no-title', {
					ns: 'discussion',
					firstUser: this.get('model.events.0.author.name'),
					secondUser: this.get('model.events.1.author.name'),
				});
			} else {
				return i18n.t('notifications.replied-by-no-title', {
					ns: 'discussion',
					user: this.get('model.events.0.author.name'),
				});
			}
		}

	}
});
