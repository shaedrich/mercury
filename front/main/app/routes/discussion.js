import Ember from 'ember';

import DiscussionCategoriesModel from '../models/discussion/categories';
import RouteWithBodyClassNameMixin from '../mixins/route-with-body-class-name';

export default Ember.Route.extend(
	RouteWithBodyClassNameMixin,
	{
		bodyClassNames: ['show-global-footer'],

		model() {
			return Ember.RSVP.hash({
				categories: DiscussionCategoriesModel.getCategories(Mercury.wiki.id),
			});
		},
	}
);
