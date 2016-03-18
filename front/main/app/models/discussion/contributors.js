import Ember from 'ember';
import DiscussionContributor from './contributor';

const DiscussionContributors = Ember.Object.extend({
	count: null,
	users: [],

	create(data) {
		return this._super({
			count: data.count,
			users: data.userInfo.map((contributor) => {
				return DiscussionContributor.create(contributor);
			})
		});
	},
});

export default DiscussionContributors;
