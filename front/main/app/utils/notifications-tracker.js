import {track as mercuryTrack} from 'common/utils/track';

const labels = {
	'discussion-upvote-reply': 'discussion-upvote-reply',
	'discussion-upvote-post': 'discussion-upvote-post',
	'discussion-reply': 'discussion-reply',
	'mark-all-as-read': 'mark-all-as-read',
	'open-menu': 'open-menu',
},
	gaCategory = 'on-site-notifications';

/**
 * @param {string} label
 * @param {string} action
 * @param {string} params
 *
 * @returns {Object}
 */
function getTrackingContext(label, action, params) {
	return $.extend({
		action,
		category: gaCategory,
		label: labels[label]
	}, params);
}

function getGAValueFromUnreadStatus(isUnread) {
	return isUnread ? 1 : 0;
}

/**
 * @param {string} action
 * @param {object} params
 *
 * @returns {void}
 */
export function track(label, action, params) {
	mercuryTrack(
		getTrackingContext(label, action, params),
	);
}

export function trackImpression(notificationModel) {
	track(
		labels[notificationModel.get('type')],
		'impression',
		{
			value: getGAValueFromUnreadStatus(notificationModel.get('isUnread'))
		}
	);
}

export function trackClick(notificationModel) {
	track(
		labels[notificationModel.get('type')],
		'click',
		{
			value: getGAValueFromUnreadStatus(notificationModel.get('isUnread'))
		}
	);
}

export function trackMarkAllAsRead() {
	track(
		labels['mark-all-as-read'],
		'click',
	);
}
