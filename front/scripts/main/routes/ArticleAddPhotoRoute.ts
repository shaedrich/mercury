/// <reference path="../app.ts" />
/// <reference path="../../../../typings/ember/ember.d.ts" />
/// <reference path="../mixins/FullPageMixin.ts"/>

'use strict';

App.ArticleAddPhotoRoute = Em.Route.extend(App.FullPageMixin, {
	/**
	 * @returns {undefined}
	 */
	renderTemplate(): void {
		this.render('article-add-photo', {
			controller: 'articleAddPhoto'
		});
	},

	actions: {
		/**
		 * @param {*} error
		 * @param {EmberStates.Transition} transition
		 * @returns {boolean}
		 */
		error(error: any, transition: EmberStates.Transition): boolean {
			this.controllerFor('application').addAlert({
				message: i18n.t('app.addphoto-load-error'),
				type: 'alert'
			});
			M.track({
				action: M.trackActions.impression,
				category: 'sectionaddphoto',
				label: 'addphoto-load-error'
			});
			return true;
		},

		/**
		 * @returns {boolean}
		 */
		didTransition(): boolean {
			window.scrollTo(0, 0);

			M.track({
				action: M.trackActions.impression,
				category: 'sectionaddphoto',
				label: 'addphoto-loaded'
			});

			return true;
		}
	}
});
