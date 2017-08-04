import Ember from 'ember';

const DiscussionContributor = Ember.Object.extend({
	avatarUrl: null,
	id: null,
	name: null,
	profileUrl: null,
});

DiscussionContributor.reopenClass({
	/**
	 * @param {string} name
	 *
	 * @returns {string}
	 */
	getProfileUrl(name) {
		return M.buildUrl({
			namespace: 'User',
			title: name
		});
	},
	getUserActivityUrl(id) {
		return M.buildUrl({
		    path: `/d/u/${id}`
		});
	}
	/**
	 * @param {object} data
	 *
	 * @returns {Ember.Object}
	 */
	create(data) {
		return this._super({
			avatarUrl: data.avatarUrl,
			badgePermission: data.badgePermission,
			id: data.id,
			name: data.name,
			profileUrl: DiscussionContributor.getProfileUrl(data.name),
			activityUrl: DiscussionContributor.getUserActivityUrl(data.id),
		});
	},
});

export default DiscussionContributor;
