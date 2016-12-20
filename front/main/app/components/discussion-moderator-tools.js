import Ember from 'ember';
import {track, trackActions} from '../utils/discussion-tracker';

export default Ember.Component.extend(
	{
		classNames: ['discussion-moderator-tools'],

		actions: {
			openReportedContent() {
				track(trackActions.ReportedPostsLinkTapped);
			},

			openUserActivity() {
				track(trackActions.UserActivityLinkTapped);
			}
		}
	}
);


