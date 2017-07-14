import Ember from "ember";
import {track, trackActions} from "common/utils/track";

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

	contributors: computed(function () {
		return [{
			"id": "29636668",
			"avatarUrl": "http://static.wikia.nocookie.net/29254630-17a1-48de-b179-2a0c41714154/scale-to-width-down/100",
			"name": "Vault-Tec Staff",
			"badgePermission": ""
		}, {
			"id": "32377837",
			"avatarUrl": "https://static.wikia.nocookie.net/7c9209f2-6033-45ff-b2e9-2e4902c32def",
			"name": "VertigoIndygo",
			"badgePermission": ""
		}, {
			"id": "32438230",
			"avatarUrl": "https://static.wikia.nocookie.net/7d238f98-b47c-4540-91cc-5438e4ed9662",
			"name": "Atlas 1738",
			"badgePermission": ""
		}, {
			"id": "31997683",
			"avatarUrl": null,
			"name": "Naja1234",
			"badgePermission": ""
		}, {
			"id": "31021421",
			"avatarUrl": "http://static.wikia.nocookie.net/29622b38-1ecf-4df8-ba14-9a3ca87a81db/scale-to-width-down/100",
			"name": "Motherfukerjones",
			"badgePermission": ""
		}].slice(0, 5).map(function (item) {
			item['url'] = M.buildUrl({
										 namespace: 'User',
										 title: item['name'],
									 });
			return item;
		});
	})
});
