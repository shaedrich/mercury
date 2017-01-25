import Ember from 'ember';
import NotificationsModel from '../models/notifications';

export default Ember.Service.extend({
	model: Ember.computed('userId', function () {
		const userId = this.get('userId');

		if (userId !== null) {
			return NotificationsModel
				.getNotifications()
				.catch((err) => {
					Ember.Logger.warn('Couldn\'t load notifications', err);
				});
		}

		return Ember.RSVP.reject();
	}),

	/**
	 * @returns {void}
	 */
	init() {
		this._super(...arguments);

		// fetch the model from the API
		this.get('model').then((model) => {
			this.setProperties({
				data: model.data,
				unreadCount: model.unreadCount
			})
		});
	},
});
