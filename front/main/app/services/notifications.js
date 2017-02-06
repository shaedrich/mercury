import Ember from 'ember';
import NotificationsModel from '../models/notifications';

const {Service, Logger, computed} = Ember;

export default Service.extend({
	model: computed(function () {
		return NotificationsModel
			.getNotifications()
			.catch((err) => {
				Logger.warn('Couldn\'t load notifications', err);
			});
	}),

	/**
	 * @returns {void}
	 */
	init() {
		this._super(...arguments);

		// fetches the model from the API at first attempt to use the data
		// then a singleton service will keep the data until page reloads
		this.get('model').then((model) => {
			this.setProperties({
				data: model.data,
				unreadCount: model.unreadCount
			})
		});
	},
});
