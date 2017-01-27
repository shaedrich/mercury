import Ember from 'ember';
import Notification from './notification';
import request from 'ember-ajax/request';

const NotificationsModel = Ember.Object.extend({
	unreadCount: null,
	data: null,

	setNormalizedData(apiData) {
		this.setProperties({
			unreadCount: 1, //apiData.unreadCount,
			data: new Ember.A()
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
				type: 'discussion-upvote',
				title: 'Zupa Romana',
				timestamp: 1485349922140,
			}
		])
	}
});

NotificationsModel.reopenClass({
	/**
	 * @returns {Ember.RSVP.Promise}
	 */
	getNotifications() {
		return new Ember.RSVP.Promise((resolve) => {
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
