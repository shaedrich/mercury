import Ember from 'ember';
import UserImagesModel from '../../../models/image-review/user-images';

const {Route, Logger} = Ember;

export default Route.extend({
	model({username}) {
		return UserImagesModel.imagesFor(username);
	},

	actions: {
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
		},

		reviewUserImages() {
			const images = this.controller.get('model.images');
			UserImagesModel.reviewUserImages(images).then(() => {
				this.controllerFor('application').addAlert({
					message: i18n.t('main.coppa-success-review', {
						ns: 'image-review'
					}),
					type: 'success',
					persistent: true
				});
			}, (data) => {
				this.controllerFor('application').addAlert({
					message: data,
					type: 'warning',
					persistent: false
				});
			});
		},
	}
});
