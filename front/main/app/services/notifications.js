import Ember from 'ember';
import NotificationsModel from '../models/notifications/notifications';

const {Service, Logger, computed, inject, RSVP} = Ember;

export default Service.extend({
	isLoading: false,
	model: null,
	notificationsPerPage: 10,

	currentUser: inject.service(),

	modelLoader: computed('currentUser.isAuthenticated', function () {
		this.set('isLoading', true);
		if (!this.isUserAuthenticated()) {
			this.set('isLoading', false);
			return RSVP.reject();
		}

		return NotificationsModel.getNotifications()
			.then((model) => {
				this.setProperties({
					model,
					isLoading: false,
				})
			})
			.catch((err) => {
				Logger.warn('Couldn\'t load notifications', err);
				this.set('isLoading', false);
			});
	}),

	/**
	 * @returns {void}
	 */
	init() {
		this._super(...arguments);
		// fetches the model from the API at first attempt to use the data
		// then a singleton service will keep the data until page reloads
		this.get('modelLoader');
	},

	loadMoreResults() {
		if (this.get('isLoading') === true && !this.isUserAuthenticated()) {
			Logger.debug('Is already loading or is not authenticated.');
			return;
		}

		this.set('isLoading', true);
		this.get('model')
			.loadMoreResults(this.get('notificationsPerPage'))
			.then(() => {
				this.set('isLoading', false);
			})
			.catch((err) => {
				Logger.warn('Couldn\'t load more notifications', err);
				this.set('isLoading', false);
			});
	},

	markAllAsRead() {
		this.get('model').markAllAsRead();
	},

	/**
	 * @private
	 */
	isUserAuthenticated() {
		return this.get('currentUser.isAuthenticated') === true;
	}

});
