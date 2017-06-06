import Ember from 'ember';

const {Mixin} = Ember;

export default Mixin.create({
	modalDialog: Ember.inject.service(),

	/**
	 * Opens a modal dialog with translated message
	 * @param {Object} openDialogParams params for display modal method [see: modalDialog::display]
	 * @param {string} openDialogParams.message text for dialog modal body message
	 * @param {string} [openDialogParams.header] text for dialog modal title
	 * @returns {void}
	 */
	openDialog(openDialogParams) {
		const displayParams = Object.assign(
				{},
				{name: 'modal-dialog-confirm-report'},
				openDialogParams
		);

		this.get('modalDialog').display(displayParams);
	},

	/**
	 * Renders a message to display to an anon trying to follow a post
	 * @param {Object} item
	 * @returns {void}
	 */
	showConfirmReportModal(item) {
		let message, confirmText, permanentActionText = i18n.t('main.report-permanent-action-text', {ns: 'discussion'});
		if (item.isReply) {
			message = `${i18n.t('main.report-reply-confirm-text', {ns: 'discussion'})} ${permanentActionText}`;
			confirmText = i18n.t('main.report-reply', {ns: 'discussion'});
		} else {
			message = `${i18n.t('main.report-post-confirm-text', {ns: 'discussion'})} ${permanentActionText}`;
			confirmText = i18n.t('main.report-post', {ns: 'discussion'});
		}

		this.openDialog({
			message,
			confirmButtonText: confirmText,
			confirmCallback: () => this.performReport(item)
		});
	},

	/**
	 * Reports a post or reply
	 * @param {Object} item
	 * @returns {void}
	 */
	performReport(item) {
		this.get('target').send('report', item);
	},

	actions: {
		/**
		 * @param {Object} post
		 * @returns {void}
		 */
		deletePost(post) {
			this.get('target').send('deletePost', post);
		},

		/**
		 * @returns {void}
		 */
		deleteAllPosts() {
			this.get('target').send('deleteAllPosts', this.get('model.current.data.entities'));
		},

		/**
		 * @param {Object} post
		 * @returns {void}
		 */
		undeletePost(post) {
			this.get('target').send('undeletePost', post);
		},

		/**
		 * Bubbles up to Route
		 * @param {Object} reply
		 * @returns {void}
		 */
		deleteReply(reply) {
			this.get('target').send('deleteReply', reply);
		},

		/**
		 * @param {Object} reply
		 * @returns {void}
		 */
		undeleteReply(reply) {
			this.get('target').send('undeleteReply', reply);
		},

		/**
		 * @param {Object} item
		 * @returns {void}
		 */
		approve(item) {
			this.get('target').send('approve', item);
		},

		/**
		 * @param {Object} item
		 * @returns {void}
		 */
		report(item) {
			this.showConfirmReportModal(item);
		},

		/**
		 * @param {Object} post
		 * @returns {void}
		 */
		lockPost(post) {
			this.get('target').send('lock', post);
		},

		/**
		 * @param {Object} post
		 * @returns {void}
		 */
		unlockPost(post) {
			this.get('target').send('unlock', post);
		},
	}
});
