import Ember from 'ember';
import Notification from './notification';
import request from 'ember-ajax/request';

const {Object, A, RSVP} = Ember;

const NotificationsModel = Object.extend({
	unreadCount: null,
	data: null,

	setNormalizedData(apiData) {
		this.setProperties({
			unreadCount: 1,
			data: new A()
		});

		this.data.pushObjects([
			{
				author: {
					avatarUrl: null,
					badgePermission: null,
					id: null,
					name: 'Brtkowal',
					profileUrl: null,
				},
				events: [
					{
						author: {
							avatarUrl: null,
							badgePermission: null,
							id: null,
							name: 'Brtkowal',
							profileUrl: null,
						},
						timestamp: 1485349922140,
					}
				],
				unread: true,
				snippet: 'lalalalala there were a couple of things done and blah blah blah',
				type: 'discussion-reply',
				siteName: 'Wookiepedia',
				timestamp: 1485349922140,
			},
			{
				author: {
					avatarUrl: null,
					badgePermission: null,
					id: null,
					name: 'Brtkowal',
					profileUrl: null,
				},
				events: [
					{
						author: {
							avatarUrl: null,
							badgePermission: null,
							id: null,
							name: 'Brtkowal',
							profileUrl: null,
						},
						timestamp: 1485349922140,
					},
					{
						author: {
							avatarUrl: null,
							badgePermission: null,
							id: null,
							name: 'Brtkowal',
							profileUrl: null,
						},
						timestamp: 1485349922140,
					}
				],
				unread: true,
				type: 'discussion-reply',
				snippet: 'lalalalala there were a couple of things done and blah blah blah',
				siteName: 'Fallout',
				timestamp: 1485349922140,
			},
			{
				author: {
					avatarUrl: null,
					badgePermission: null,
					id: null,
					name: 'Brtkowal',
					profileUrl: null,
				},
				events: [
					{
						author: {
							avatarUrl: null,
							badgePermission: null,
							id: null,
							name: 'Brtkowal',
							profileUrl: null,
						},
						timestamp: 1485349922140,
					},
					{
						author: {
							avatarUrl: null,
							badgePermission: null,
							id: null,
							name: 'Brtkowal',
							profileUrl: null,
						},
						timestamp: 1485349922140,
					},
					{
						author: {
							avatarUrl: null,
							badgePermission: null,
							id: null,
							name: 'Brtkowal',
							profileUrl: null,
						},
						timestamp: 1485349922140,
					},
					{
						author: {
							avatarUrl: null,
							badgePermission: null,
							id: null,
							name: 'Brtkowal',
							profileUrl: null,
						},
						timestamp: 1485349922140,
					},
					{
						author: {
							avatarUrl: null,
							badgePermission: null,
							id: null,
							name: 'Brtkowal',
							profileUrl: null,
						},
						timestamp: 1485349922140,
					},
					{
						author: {
							avatarUrl: null,
							badgePermission: null,
							id: null,
							name: 'Brtkowal',
							profileUrl: null,
						},
						timestamp: 1485349922140,
					}

				],
				title: 'Harmless title',
				type: 'discussion-reply',
				siteName: 'Fallout',
				timestamp: 1485349922140,
			},
			{
				author: {
					avatarUrl: null,
					badgePermission: null,
					id: null,
					name: 'Brtkowal',
					profileUrl: null,
				},
				events: [
					{
						author: {
							avatarUrl: null,
							badgePermission: null,
							id: null,
							name: 'Brtkowal',
							profileUrl: null,
						},
						timestamp: 1485349922140,
					}
				],
				type: 'discussion-upvote-post',
				snippet: 'lalalalala there were a couple of things done and blah blah blah',
				siteName: 'Wookiepedia',
				timestamp: 1485349922140,
			},
			{
				author: {
					avatarUrl: null,
					badgePermission: null,
					id: null,
					name: 'Brtkowal',
					profileUrl: null,
				},
				events: [
					{
						author: {
							avatarUrl: null,
							badgePermission: null,
							id: null,
							name: 'Brtkowal',
							profileUrl: null,
						},
						timestamp: 1485349922140,
					},
					{
						author: {
							avatarUrl: null,
							badgePermission: null,
							id: null,
							name: 'Brtkowal',
							profileUrl: null,
						},
						timestamp: 1485349922140,
					}
				],
				type: 'discussion-upvote-post',
				snippet: 'lalalalala there were a couple of things done and blah blah blah',
				siteName: 'Wookiepedia',
				timestamp: 1485349922140,
			},
			{
				author: {
					avatarUrl: null,
					badgePermission: null,
					id: null,
					name: 'Brtkowal',
					profileUrl: null,
				},
				events: [
					{
						author: {
							avatarUrl: null,
							badgePermission: null,
							id: null,
							name: 'Brtkowal',
							profileUrl: null,
						},
						timestamp: 1485349922140,
					},
					{
						author: {
							avatarUrl: null,
							badgePermission: null,
							id: null,
							name: 'Brtkowal',
							profileUrl: null,
						},
						timestamp: 1485349922140,
					}
				],
				type: 'discussion-upvote-reply',
				snippet: 'lalalalala there were a couple of things done and blah blah blah',
				siteName: 'Wookiepedia',
				timestamp: 1485349922140,
			},
			{
				author: {
					avatarUrl: null,
					badgePermission: null,
					id: null,
					name: 'Brtkowal',
					profileUrl: null,
				},
				events: [
					{
						author: {
							avatarUrl: null,
							badgePermission: null,
							id: null,
							name: 'Brtkowal',
							profileUrl: null,
						},
						timestamp: 1485349922140,
					},
					{
						timestamp: 1485349922140,
					}
				],
				type: 'discussion-upvote-reply',
				snippet: 'lalalalala there were a couple of things done and blah blah blah',
				siteName: 'Wookiepedia',
				timestamp: 1485349922140,
			},
		]);
	},

	loadMoreResults() {
		return new RSVP.Promise((resolve) => {
			return resolve();
		});
	},

	markAllAsRead() {
		return new RSVP.Promise((resolve) => {
			return resolve();
		});
	},
});

NotificationsModel.reopenClass({
	/**
	 * @returns {Ember.RSVP.Promise}
	 */
	getNotifications() {
		return new RSVP.Promise((resolve) => {
			const notificationsInstance = NotificationsModel.create();

			// request(M.getDiscussionServiceUrl(`/${wikiId}/forums`)).then((data) => {
			// 	discussionInstance.setNormalizedData(data);
			//
			// 	resolve(discussionInstance);
			// }).catch(() => {
			// 	// Categories fail silently - you can still view the default category
			// 	resolve(discussionInstance);
			// });

			notificationsInstance.setNormalizedData();
			return resolve(notificationsInstance);
		});
	}
});

export default NotificationsModel;
