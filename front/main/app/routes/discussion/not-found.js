import DiscussionBaseRoute from './base';

export default DiscussionBaseRoute.extend({

	/**
	 * @returns {void}
	 */
	renderTemplate() {
		this.render('discussion/error-404');
	},
});
