import Ember from 'ember';
import wrapMeHelper from '../helpers/wrap-me';
import NewReplyNotificationMixin from '../mixins/new-reply-notification';
import PostUpvoteNotificationMixin from '../mixins/post-upvote-notification';
import ReplyUpvoteNotificationMixin from '../mixins/reply-upvote-notification';

const {Component, inject, computed, Logger} = Ember;

export default Component.extend(
	NewReplyNotificationMixin,
	PostUpvoteNotificationMixin,
	ReplyUpvoteNotificationMixin,
	{
		classNames: ['notification-card'],

		classNameBindings: ['isUnread'],

		tagName: 'li',

		currentUser: inject.service(),
		// use the proper user lang after the translations are merged
		// userLanguage: computed.oneWay('currentUser.language'),
		userLanguage: 'en',

		iconName: computed('model.type', function () {
			return this.get('model.type') === 'discussion-reply' ?
				'wds-icons-reply-small' :
				'wds-icons-upvote-small';
		}),

		isUnread: computed.alias('model.unread'),

		postTitleMarkup: computed('model.title', function () {
			return wrapMeHelper.compute([
				this.get('model.title')
			], {
				tagName: 'b',
			});
		}),

		postSnippetMarkup: computed('model.snippet', function () {
			return wrapMeHelper.compute([
				this.get('model.snippet')
			], {
				tagName: 'i',
			});
		}),

		text: computed('model', function () {
			const model = this.get('model'),
				type = model.type;

			if (this.isDiscussionReply(type)) {
				return this.getReplyMessageBody(model);

			} else if (this.isDiscussionPostUpvote(type)) {
				return this.getPostUpvoteMessageBody(model);

			} else if (this.isDiscussionReplyUpvote(type)) {
				return this.getReplyUpvoteMessageBody(model);

			} else {
				Logger.warn('No type found for a notification', model);
			}
		}),

		isDiscussionReply(type) {
			return type === 'discussion-reply';
		},

		isDiscussionReplyUpvote(type) {
			return type === 'discussion-upvote-reply';
		},

		isDiscussionPostUpvote(type) {
			return type === 'discussion-upvote-post';
		},

		showAvatars: computed('model.events.length', 'model.type', function () {
			return this.get('model.events.length') > 2 && this.get('model.type') === 'discussion-reply';
		}),

		authors: computed('model.events', function () {
			return this.get('model.events').mapBy('author');
		}),

		getTranslatedMessage(key, context) {
			const fullContext = $.extend({}, {
				lng: this.get('userLanguage'),
				ns: 'discussion',
			}, context);

			return i18n.t(key, fullContext);
		}
	}
);
