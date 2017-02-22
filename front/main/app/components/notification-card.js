import Ember from 'ember';
import wrapMeHelper from '../helpers/wrap-me';
import NewReplyNotificationMixin from '../mixins/new-reply-notification';
import PostUpvoteNotificationMixin from '../mixins/post-upvote-notification';
import ReplyUpvoteNotificationMixin from '../mixins/reply-upvote-notification';
import {trackClick, trackImpression} from '../utils/notifications-tracker';
import {notificationTypes} from '../utils/global-notifications';

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
			return this.isDiscussionReply(this.get('model.type')) ?
				'wds-icons-reply-small' :
				'wds-icons-upvote-small';
		}),

		isUnread: computed.alias('model.isUnread'),

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

		didInsertElement() {
			trackImpression(this.get('model'));
		},

		isDiscussionReply(type) {
			return type === notificationTypes.discussionReply;
		},

		isDiscussionReplyUpvote(type) {
			return type === notificationTypes.discussionUpvoteReply;
		},

		isDiscussionPostUpvote(type) {
			return type === notificationTypes.discussionUpvotePost;
		},

		showAvatars: computed('model.totalUniqueActors', 'model.type', function () {
			return this.get('model.totalUniqueActors') > 2 &&
				this.isDiscussionReply(this.get('model.type'));
		}),

		getTranslatedMessage(key, context) {
			const fullContext = $.extend({}, {
				lng: this.get('userLanguage'),
				ns: 'discussion',
			}, context);

			return i18n.t(key, fullContext);
		},

		actions: {
			onNotificationClicked() {
				trackClick(this.get('model'));
			}
		}
	}
);
