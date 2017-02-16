import Ember from 'ember';
import wrapMeHelper from '../helpers/wrap-me';
import {track, trackActions} from '../utils/discussion-tracker';

const {Component, computed, inject, Handlebars} = Ember;

export default Component.extend({
	classNames: ['top-note'],

	canDelete: computed.readOnly('post.userData.permissions.canDelete'),
	canModerate: computed.readOnly('post.userData.permissions.canModerate'),
	isLocked: computed.readOnly('post.isLocked'),
	showButtons: computed.and('canShowModButtons', 'isReported', 'canModerate'),
	modalDialog: inject.service(),

	isReportDetailsVisible: false,

	reportDetailsEntryPointClassName: 'reportDetailsOpener',

	/**
	 * Context for the i18n.t method for localization texts used in top note area
	 */
	topNoteTextContext: computed('post.reportDetails.count', function () {
		return {
			ns: 'discussion',
			reportedByNumberUsers: wrapMeHelper.compute([
				i18n.t('main.reported-by-number-users', {
					ns: 'discussion',
					count: this.get('post.reportDetails.count'),
				})
			], {
				tagName: 'a',
				className: this.get('reportDetailsEntryPointClassName'),
			}),
			count: this.get('post.reportDetails.count'),
			reporterUserName: wrapMeHelper.compute([
				this.get('post.reportDetails.users.firstObject.name')
			], {
				tagName: 'a',
				className: this.get('reportDetailsEntryPointClassName'),
			}),
			threadCreatorName: Handlebars.Utils.escapeExpression(this.get('threadCreatorName')),
		};
	}),

	/**
	 * @private
	 */
	getReportedByMessageForModerator(isReply, isLocked, shouldShowRepliedTo) {
		if (isReply) {
			return this.getReportedReplyMessageForModerator(shouldShowRepliedTo);
		} else {
			return this.getReportedPostMessageForModerator(isLocked);
		}
	},

	/**
	 * @private
	 */
	getReportedReplyMessageForModerator(shouldShowRepliedTo) {
		if (shouldShowRepliedTo) {
			// post is reported, is a reply and supposed to show reply-to info
			return i18n.t('main.reported-by-replied-to', this.get('topNoteTextContext'));
		} else {
			// post is reported, is a reply, but NOT supposed to show reply-to info
			return i18n.t('main.reported-by-reply', this.get('topNoteTextContext'));
		}
	},

	/**
	 * @private
	 */
	getReportedPostMessageForModerator(isLocked) {
		if (isLocked) {
			return i18n.t('main.reported-by-and-locked', this.get('topNoteTextContext'));
		}
		// post is reported and is NOT a reply
		return i18n.t('main.reported-by', this.get('topNoteTextContext'));
	},

	/**
	 * @private
	 */
	getReportedByMessageForNonModerator(isReply, isLocked) {
		if (isReply) {
			// post is reported, is a reply, but NOT supposed to show reply-to info
			return i18n.t('main.reported-to-moderators-reply', this.get('topNoteTextContext'));
		} else if (isLocked) {
			// post is reported and locked
			return i18n.t('main.reported-to-moderators-and-locked', this.get('topNoteTextContext'));
		} else {
			// post is reported and is NOT a reply
			return i18n.t('main.reported-to-moderators', this.get('topNoteTextContext'));
		}
	},

	/**
	 * @private
	 */
	getDeletedByMessageForModerator() {
		let username = this.get('post.lastDeletedBy.name') || '';
		return i18n.t('main.deleted-by', {userName: username, ns: 'discussion'});
	},

	/**
	 * @private
	 */
	getRepliedToMessage() {
		// post is NOT reported, is a reply and supposed to show reply-to info
		return i18n.t('main.user-replied-to', this.get('topNoteTextContext'));
	},

	/**
	 * @private
	 */
	getLockedPostMessage() {
		return i18n.t('main.locked-post-text', this.get('topNoteTextContext'));
	},

	/**
	 * Computes text for the post-card note
	 */
	topNoteText: computed('isReported', 'post.isLocked', 'post.reportDetails.count',
		'post.isDeleted', 'post.lastDeletedBy.name', function () {
			const isReply = this.get('post.isReply'),
				isLocked = this.get('isLocked'),
				isDeleted = this.get('post.isDeleted'),
				isReported = this.get('isReported'),
				reportDetails = this.get('post.reportDetails'),
				canSeeModeratorContent = this.get('canModerate'),
				shouldShowRepliedTo = this.get('showRepliedTo');

			if (isDeleted && canSeeModeratorContent) {
				return this.getDeletedByMessageForModerator();

			} else if (isReported && canSeeModeratorContent && reportDetails) {
				return this.getReportedByMessageForModerator(isReply, isLocked, shouldShowRepliedTo);

			} else if (isReported && !canSeeModeratorContent) {
				return this.getReportedByMessageForNonModerator(isReply, isLocked);

			} else if (shouldShowRepliedTo) {
				return this.getRepliedToMessage();

			} else if (isLocked) {
				return this.getLockedPostMessage();

			}
		}),

	/**
	 * We want to trigger the action (report-details-modal open) only when the specific part of text is clicked/tapped.
	 * That part of text is wrapped in <span> element and contains class defined in 'reportDetailsEntryPointClassName'
	 * property.
	 * @param {Object} event - event object
	 * @returns {void}
	 */

	click(event) {
		if (event.target.classList.contains(this.get('reportDetailsEntryPointClassName'))) {
			this.set('isReportDetailsVisible', true);
			track(trackActions.ReportDetailsModalOpen);
		}
	},

	actions: {
		/**
		 * Delete item - shows modal dialog first
		 * @param {Object} item - post or reply
		 * @param {boolean} isReply - if this is a reply
		 * @returns {void}
		 */
		delete(item, isReply) {
			let message,
				header;

			if (isReply) {
				message = i18n.t(`main.modal-dialog-delete-reply-text`, {ns: 'discussion'});
				header = i18n.t(`main.modal-dialog-delete-reply-header`, {ns: 'discussion'});
			} else {
				message = i18n.t(`main.modal-dialog-delete-text`, {ns: 'discussion'});
				header = i18n.t(`main.modal-dialog-delete-header`, {ns: 'discussion'});
			}

			this.get('modalDialog').display({
				message,
				header,
				name: 'modal-dialog-delete',
				confirmButtonText: i18n.t('main.modal-dialog-delete', {ns: 'discussion'}),
				confirmCallback: (() => this.get('delete')(item)),
			});
		},

		/**
		 * Approve item - shows modal dialog first
		 * @param {Object} item - post or reply
		 * @param {boolean} isReply - if this is a reply
		 * @returns {void}
		 */
		approve(item, isReply) {
			let message,
				header;

			if (isReply) {
				message = i18n.t(`main.modal-dialog-approve-reply-text`, {ns: 'discussion'});
				header = i18n.t(`main.modal-dialog-approve-reply-header`, {ns: 'discussion'});
			} else {
				message = i18n.t(`main.modal-dialog-approve-text`, {ns: 'discussion'});
				header = i18n.t(`main.modal-dialog-approve-header`, {ns: 'discussion'});
			}

			this.get('modalDialog').display({
				message,
				header,
				name: 'modal-dialog-approve',
				confirmButtonText: i18n.t('main.modal-dialog-approve', {ns: 'discussion'}),
				confirmCallback: (() => this.get('approve')(item)),
			});
		},

		reportDetailsClose() {
			this.set('isReportDetailsVisible', false);
		},
	}
});
