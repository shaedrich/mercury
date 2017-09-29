import Ember from 'ember';
import request from 'ember-ajax/request';

const {Route} = Ember;

export default Route.extend({

	model() {
		return request(M.getImageReviewServiceUrl('/info')).then(({userAllowedToAuditReviews}) => {
			if (!userAllowedToAuditReviews) {
				this.controllerFor('application').addAlert({
					message: i18n.t('main.error-no-access-permissions', {ns: 'image-review'}),
					type: 'warning',
					persistent: true
				});
				this.transitionTo('image-review.error');
			}
		}, () => {
			this.controllerFor('application').addAlert({
				message: i18n.t('main.error-other', {ns: 'image-review'}),
				type: 'warning',
				persistent: true
			});
			this.transitionTo('image-review.error');
		});
	},

	afterModel() {
		this.controllerFor('application').set('isLoading', false);
		this.controllerFor('application').set('fullPage', true);
	}

});
