export default Ember.Service.extend({
	hideDeleted: false,

	/**
	 * @returns {void}
	 */
	toggleHideDeleted() {
		this.set('hideDeleted', !this.get('hideDeleted'));
	}
 });
