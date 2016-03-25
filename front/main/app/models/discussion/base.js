import Ember from 'ember';

export default Ember.Object.extend({
	wikiId: null,
	forumId: null,

	errorCodes: {
		notFound: 404
	},
	errorClass: 'discussion-error-page',
	errorMessage: null,
	hasErrorMessage: false,
	connectionError: null,
	notFoundError: null,
	pivotId: null,

	data: Ember.Object.create(),

	/*
	 * Set minorError to true, when you don't want to display error message e.g.:
	 * 404 on infinite scroll, when unable to load non-existing pages
	 * 404 on "view older replies" button, when unable to load non-existing or deleted replies
	 */
	minorError: false,

	/**
	 * @returns {void}
	 */
	init() {
		const wikiId = Ember.get(Mercury, 'wiki.id');

		this.setProperties({
			forumId: wikiId,
			wikiId
		});
	},

	/**
	 * @param {Object} err
	 * @returns {void}
	 */
	setErrorProperty(err) {
		if (err.status === this.errorCodes.notFound) {
			this.set('data.notFoundError', true);
		} else {
			this.set('data.connectionError', true);
		}
		Ember.$('body').addClass(this.errorClass);
	},

	/**
	 * @param {Object} err
	 * @returns {void}
	 */
	handleLoadMoreError(err) {
		if (err.status === this.errorCodes.notFound) {
			this.set('minorError', true);
		} else {
			this.setErrorProperty(err);
		}
	},

	/**
	 * @param {string} errorMessage
	 * @returns {void}
	 */
	setFailedState(errorMessage) {
		this.set('data.dialogMessage', errorMessage);
	}
});
