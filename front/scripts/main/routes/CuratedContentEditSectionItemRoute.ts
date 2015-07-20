/// <reference path="../app.ts" />
/// <reference path="../../../../typings/ember/ember.d.ts" />
///<reference path="../components/CuratedContentEditBlockComponent.ts"/>

'use strict';

App.CuratedContentEditSectionItemRoute = Em.Route.extend({
	renderTemplate: function (): void {
		this.render('curated-content-edit-item');
	},

	serialize: function (model: CuratedContentEditBlockItemInterface) {
		return {
			// Sections have titles, section items have labels and titles - we want to show labels for them
			section: encodeURIComponent(model.section),
			item: encodeURIComponent(model.item.label || model.item.title)
		};
	},

	model: function (params: any) {
		return App.CuratedContentEditItemModel().getItem(params);
	},

	/**
	 * @desc If model wasn't passed to the route (on page refresh) we redirect to /main/edit
	 *
	 * @param transition
	 */
	beforeModel: function (transition: any) {
		if (!Em.isArray(transition.intent.contexts)) {
			this.transitionTo('curatedContentEdit.index');
		}
	}
});
