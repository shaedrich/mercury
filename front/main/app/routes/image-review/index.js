import Ember from 'ember';
import ImageReviewModel from '../../models/image-review/batch-id';

const {Route, Logger} = Ember;

export default Route.extend({

	model({status, order, source}) {
		return ImageReviewModel.reserveNewBatch(status || 'UNREVIEWED', order, source);
	},

	redirect(model) {
		this.transitionTo('image-review.batch-id', model);
	},

	actions: {
		error(error) {
			Logger.error('image-review route error', error);
			let errorMessage = i18n.t('main.error-other', {ns: 'image-review'});

			if (error.response.errors.some((e) => e.status === "401")) {
				errorMessage = i18n.t('main.error-no-access-permissions', {ns: 'image-review'});
			}

			this.controllerFor('application').addAlert({
				message: errorMessage,
				type: 'warning',
				persistent: true
			});

			this.transitionTo('image-review.error');
			return false;
		}
	}
});
