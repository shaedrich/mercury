export default Ember.Service.extend({
	willHideDeleted: false,
	hideDeleted: false,

	/**
	 * @returns {void}
	 */
	toggleHideDeleted() {
		this.set('willHideDeleted', !this.get('willHideDeleted'));
	},

	/**
	 * @returns {void}
	 */
	applyHideDeleted() {
		this.set('hideDeleted', this.get('willHideDeleted'));
	}
 });
