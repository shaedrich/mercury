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
	contributors: M.prop('discussionsContributors') || [],

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

	didInsertElement() {
		this.$().on('click', '[data-tracking-label]', (e) => {
			const label = this.$(e.currentTarget).data('tracking-label');

			track({
				category: 'community-header',
				action: trackActions.click,
				label: label
			});

			e.stopPropagation();
		});
	}
});
