import Ember from 'ember';

export default Ember.Route.extend({
	/**
	 * When user tries to load invalid path under /d/* we redirect to /d
	 *
	 * @returns {void}
	 */
	beforeModel() {
		this.transitionTo('discussion');
	}
});
