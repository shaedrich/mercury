App.DiscussionAppPromotionComponent = Em.Component.extend({
	classNames: ['discussion-app-promotion'],

	discussionsSplashPageConfig: M.prop('discussionsSplashPageConfig'),

	androidAppLink: Em.computed('discussionsSplashPageConfig', function () {
		const discussionsSplashPageConfig = this.get('discussionsSplashPageConfig');

		return discussionsSplashPageConfig ? discussionsSplashPageConfig.androidAppLink : null;
	}),

	iosAppLink: Em.computed('discussionsSplashPageConfig', function () {
		const discussionsSplashPageConfig = this.get('discussionsSplashPageConfig');

		return discussionsSplashPageConfig ? discussionsSplashPageConfig.iosAppLink : null;
	}),

	shouldDisplay: Em.computed.and('androidAppLink', 'iosAppLink'),
});
