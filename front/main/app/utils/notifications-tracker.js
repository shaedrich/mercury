import {track as mercuryTrack} from 'common/utils/track';

const labels = {
		'discussion-upvote-reply': 'discussion-upvote-reply',
		'discussion-upvote-post': 'discussion-upvote-post',
		'discussion-reply': 'discussion-reply',
		markAllAsRead: 'mark-all-as-read',
		markAsRead: 'mark-as-read',
		openMenu: 'open-menu'
	};

/**
 * Currently we change mobile to desktop layout
 *
 * @returns {string}
 */
function getGACategory() {
	return window.innerWidth < 1064 ? 'on-site-notifications-mobile' : 'on-site-notifications-desktop';
}

/**
 * @param {string} label
 * @param {string} action
 * @param {Object} params
 *
 * @returns {Object}
 */
function getTrackingContext(label, action, params) {
	return $.extend({
		action,
		category: getGACategory(),
		label: labels[label]
	}, params);
}

function getGAValueFromUnreadStatus(isUnread) {
	return isUnread ? 1 : 0;
}

/**
 * @param {string} label
 * @param {string} action
 * @param {Object} params
 *
 * @returns {void}
 */
export function track(label, action, params = null) {
	mercuryTrack(
		getTrackingContext(label, action, params),
	);
}

export function trackImpression(notification) {
	track(
		labels[notification.get('type')],
		'impression',
		{
			value: getGAValueFromUnreadStatus(notification.get('isUnread'))
		}
	);
}

export function trackClick(notification) {
	track(
		labels[notification.get('type')],
		'click',
		{
			value: getGAValueFromUnreadStatus(notification.get('isUnread'))
		}
	);
}

export function trackMarkAsRead(notification) {
	track(
		`${labels.markAsRead}-${labels[notification.get('type')]}`,
		'click',
	);
}

export function trackMarkAllAsRead() {
	track(
		labels.markAllAsRead,
		'click',
	);
}

export function trackOpenMenu(unreadCount) {
	track(
		labels.openMenu,
		'click',
		{
			value: unreadCount
		}
	);
}
