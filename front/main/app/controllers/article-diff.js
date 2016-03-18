import Ember from 'ember';
import TrackClickMixin from '../mixins/track-click';
import {track, trackActions} from 'common/utils/track';
import getEditToken from '../utils/edit-token';

export default Ember.Controller.extend(
	TrackClickMixin,
	{
		application: Ember.inject.controller(),
		shouldShowUndoConfirmation: false,
		currRecentChangeId: null,

		/**
		 * @returns {void}
		 */
		handleUndoSuccess() {
			this.transitionToRoute('recent-wiki-activity', {queryParams: {rc: this.get('currRecentChangeId')}})
				.then(() => {
					this.get('application').addAlert({
						message: i18n.t('main.undo-success', {
							pageTitle: this.get('model.title'),
							ns: 'recent-wiki-activity'
						}),
						type: 'success'
					});
				});

			track({
				action: trackActions.impression,
				category: 'recent-wiki-activity',
				label: 'undo-success'
			});
		},

		/**
		 * @returns {void}
		 */
		handleUpvoteSuccess() {
			this.transitionToRoute('recent-wiki-activity', {queryParams: {rc: this.get('currRecentChangeId')}})
				.then(() => {
					this.get('application').addAlert({
						message: i18n.t('main.upvote-success', {
							pageTitle: this.get('model.title'),
							ns: 'recent-wiki-activity'
						}),
						type: 'success'
					});
				});

			track({
				action: trackActions.impression,
				category: 'recent-wiki-activity',
				label: 'upvote-success'
			});
		},

		/**
		 * @param {*} error
		 * @returns {void}
		 */
		handleUndoError(error) {
			const application = this.get('application'),
				errorMsg = error === 'undofailure' ? 'main.undo-failure' : 'main.undo-error';

			application.addAlert({
				message: i18n.t(errorMsg, {ns: 'recent-wiki-activity'}),
				type: 'alert'
			});

			application.set('isLoading', false);

			track({
				action: trackActions.impression,
				category: 'recent-wiki-activity',
				label: 'undo-error'
			});
		},

		actions: {
			/**
			 * @param {string} summary Description of reason for undo to be stored as edit summary
			 * @returns {void}
			 */
			undo(summary) {
				this.get('application').set('isLoading', true);

				this.get('model').undo(summary).then(
					this.handleUndoSuccess.bind(this),
					this.handleUndoError.bind(this)
				);

				TrackClickMixin.trackClick('recent-wiki-activity', 'undo');
			},

			/**
			 * Shows confirmation modal
			 * @returns {void}
			 */
			showConfirmation() {
				this.set('shouldShowUndoConfirmation', true);

				track({
					action: trackActions.open,
					category: 'recent-wiki-activity',
					label: 'undo-confirmation-open'
				});
			},

			/**
			 * Closes confirmation modal
			 * @returns {void}
			 */
			closeConfirmation() {
				this.set('shouldShowUndoConfirmation', false);

				track({
					action: trackActions.close,
					category: 'recent-wiki-activity',
					label: 'undo-confirmation-close'
				});
			},

			/**
			 * Send info to server that user upvoted a revision
			 * @returns {void}
			 */
			upvote() {
				getEditToken(this.get('model.title'))
					.then((token) => {
						Ember.$.ajax({
							url: M.buildUrl({
								path: '/wikia.php?controller=RevisionUpvotesApiController&method=addUpvote',
							}),
							data: {
								revisionId: this.get('model.newId'),
								token
							},
							dataType: 'json',
							method: 'POST',
							success: (data) => {
								if (data && data.success) {
									this.handleUpvoteSuccess();
								} else {
									// TODO throw error
									// reject(data.errors);
								}
							},
							// TODO throw error
							// error: (err) => reject(err)
						});
					});
				this.trackClick('recent-wiki-activity', 'upvote');
			}
		}
	}
);
