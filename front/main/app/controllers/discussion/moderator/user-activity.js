import DiscussionModerationControllerMixin from '../../../mixins/discussion-moderation-controller';
import DiscussionContributionControllerMixin from '../../../mixins/discussion-contribution-controller';
import ResponsiveMixin from '../../../mixins/responsive';
import DiscussionBaseController from '../base';
import {track, trackActions} from '../../../utils/discussion-tracker';

export default DiscussionBaseController.extend(
	DiscussionModerationControllerMixin,
	DiscussionContributionControllerMixin,
	ResponsiveMixin,
	{
		options: {
			posts: {
				isActive: false,
			}
		},

		days: null,

		queryParams: ['days'],

		parentController: Ember.inject.controller('discussion.moderator.user-activity'),

		applicationController: Ember.inject.controller('application'),

		currentRouteName: Ember.computed.alias('applicationController.currentRouteName'),

		wikiName: Ember.get(Mercury, 'wiki.siteName'),

		actions: {
			setDays(days) {
				this.get('target').send('setDays', days);
			},

			clickCommunityName() {
				track(trackActions.CommunityNameClicked);
			},

			clickCommunityBadge() {
				track(trackActions.CommunityBadgeClicked);
			}
		}
	}
);
