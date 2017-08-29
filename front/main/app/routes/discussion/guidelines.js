import Ember from 'ember';
import DiscussionBaseRoute from './base';
import RouteWithBodyClassNameMixin from '../../mixins/route-with-body-class-name';
import DiscussionSiteAttributesModel from '../../models/discussion/site-attributes';

export default DiscussionBaseRoute.extend(
	RouteWithBodyClassNameMixin,
	{
		bodyClassNames: ['standalone-page'],

		model() {
			return Ember.RSVP.hash({
				attributes: DiscussionSiteAttributesModel.find(Mercury.wiki.id),
			});
		},
	}
);
