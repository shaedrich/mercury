import Ember from 'ember';
import {track, trackActions} from 'common/utils/track';

const {
	Component,
	Handlebars: {SafeString},
	Object: EmberObject,
	computed
} = Ember;

export default Component.extend({
	tagName: 'header',
	classNames: ['wds-community-header'],
	attributeBindings: ['style'],

	model: EmberObject.create(M.prop('communityHeader')),
	style: computed('model.background_image', function () {
		const backgroundImage = this.get('model.background_image'),
			style = `background-image: url('${backgroundImage}');`;

		return new SafeString(style);
	}),
	numberOfPostsLabel: computed('numberOfPosts', function () {
		const key = this.get('numberOfPosts') === 1 ?
			'community-header-discussions-post' :
			'community-header-discussions-posts';

		return i18n.t(key, {
			ns: 'design-system'
		});
	}),

	contributors: computed(() => {
		const contributors = M.prop('discussionsContributors') || [];

		return contributors.map((item) => {
			item.url = M.buildUrl({
				namespace: 'User',
				title: item.name,
			});

			return item;
		});
	})
});
