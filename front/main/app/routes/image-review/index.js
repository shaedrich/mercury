import Ember from 'ember';
import ImageReviewModel from '../../models/image-review/batch-id';

const {Route} = Ember;

export default Route.extend({

	model({status, order, source}) {
		return ImageReviewModel.reserveNewBatch(status || 'UNREVIEWED', order, source);
	},

	redirect(model) {
		this.transitionTo('image-review.batch-id', model);
	}
});
