import Ember from 'ember';
import NotificationsModel from '../models/notifications/notifications';

const {Service, Logger, computed, inject, RSVP} = Ember;

export default Service.extend({
	model: NotificationsModel.create(),
	isLoading: false,
	nextPage: null,

	currentUser: inject.service(),

	/**
	 * @private
	 */
	isUserAuthenticated: Ember.computed.bool('currentUser.isAuthenticated'),

	modelLoader: computed('isUserAuthenticated', function () {
		if (!this.get('isUserAuthenticated')) {
			return RSVP.reject();
		}
		return this.get('model').loadUnreadNotificationCount()
			.catch((err) => {
				Logger.warn('Couldn\'t load notification count', err);
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

	loadFirstPage() {
		this.set('isLoading', true);
		if (!this.get('isUserAuthenticated')
			|| this.get('nextPage') !== null) {
			this.set('isLoading', false);
			return RSVP.reject();
		}

		this.get('model')
			.loadFirstPage()
			.then((nextPage) => {
				this.setProperties({
					isLoading: false,
					nextPage
				});
			})
			.catch((err) => {
				Logger.warn('Couldn\'t load first page', err);
				this.set('isLoading', false);
			});
	},

	loadMoreResults() {
		if (this.get('isLoading') === true
			|| !this.get('isUserAuthenticated')
			|| this.get('allLoaded') === true
			|| this.get('nextPage') === null) {
			return;
		}

		this.set('isLoading', true);
		this.get('model')
			.loadMoreResults(this.get('notificationsPerPage'))
			.then((nextPage) => {
				this.setProperties({
					isLoading: false,
					nextPage
				});
			})
			.catch((err) => {
				Logger.warn('Couldn\'t load more notifications', err);
				this.set('isLoading', false);
			});
	},

	markAllAsRead() {
		this.get('model').markAllAsRead();
	},

	markAsRead(notification) {
		this.get('model').markAsRead(notification);
	}

});
