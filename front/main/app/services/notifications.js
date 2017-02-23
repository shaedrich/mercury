import Ember from 'ember';
import NotificationsModel from '../models/notifications/notifications';

const {Service, Logger, computed, inject, RSVP} = Ember;

export default Service.extend({
	isLoading: false,
	model: null,
	notificationsPerPage: 10,

	currentUser: inject.service(),

	modelLoader: computed('currentUser.userId', function () {
		if (this.get('currentUser.userId') !== null) {
			return NotificationsModel
				.getNotifications()
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
		}

		return RSVP.reject();
	}),

	/**
	 * @returns {void}
	 */
	init() {
		this._super(...arguments);
		this.set('isLoading', true);
		// fetches the model from the API at first attempt to use the data
		// then a singleton service will keep the data until page reloads
		this.get('modelLoader');
	},

	loadMoreResults() {
		if (this.get('isLoading') === true) {
			Logger.info('Is already loading');
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
	}
});
