import Ember from 'ember';
import wrapMeHelper from '../helpers/wrap-me';
import NewReplyNotificationMixin from '../mixins/new-reply-notification'
import PostUpvoteNotificationMixin from '../mixins/post-upvote-notification'
import ReplyUpvoteNotificationMixin from '../mixins/reply-upvote-notification'

export default Ember.Component.extend(
	NewReplyNotificationMixin,
	PostUpvoteNotificationMixin,
	ReplyUpvoteNotificationMixin,
	{
		classNames: ['notification-card'],

		classNameBindings: ['isUnread'],

		tagName: 'li',

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
		}
	}
);
