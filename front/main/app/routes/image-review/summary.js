import Ember from 'ember';
import ImageReviewSummaryModel from '../../models/image-review/summary';

const {Route, Logger} = Ember;

export default Route.extend({
	model() {
		return ImageReviewSummaryModel.createEmptyModel();
	},

	afterModel() {
		this.controllerFor('application').set('isLoading', false);
		this.controllerFor('application').set('fullPage', true);
	},

	actions: {
		toggleSummary() {
			this.modelFor('image-review.summary').setSummaryModel();
		},

		toggleHistory() {
			this.modelFor('image-review.summary').setHistoryModel();
		},

		downloadCSV() {
			this.modelFor('image-review.summary').downloadCSV();
		},

		setStartDate(startDate) {
			this.modelFor('image-review.summary').setStartDate(startDate);
		},

		setEndDate(endDate) {
			this.modelFor('image-review.summary').setEndDate(endDate);
		},

		openImageReview() {
			this.transitionTo('image-review.index');
		},

		error(error) {
			Logger.error('image-review route error', error);
			let errorMessage = i18n.t('main.error-other', {ns: 'image-review'});

			if (error.errors.some((e) => e.status === '401')) {
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
