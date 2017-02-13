import Ember from 'ember';
import {extractDomainFromUrl} from '../utils/domain';
import DiscussionContributor from './discussion/domain/contributor';

const {Object} = Ember;

const NotificationModel = Object.extend({
	author: null,
	title: null,
	textSnippet: null,
	timestamp: null,
	communityName: null,
	type: null,
	threadId: null,
	siteId: null,
	replyId: null
});

NotificationModel.reopenClass({
	/**
	 * @param {Object} notificationData
	 *
	 * @returns {array}
	 */
	create(notificationData) {
		return this._super({
			author: DiscussionContributor.create(notificationData.author),
			title: notificationData.title,
			textSnippet: notificationData.textSnippet,
			timestamp: notificationData.timestamp,
			communityName: notificationData.communityName,
			type: notificationData.type,
			threadId: notificationData.threadId,
			siteId: notificationData.siteId,
			replyId: notificationData.replyId,
		});
	},
});

export default NotificationModel;
