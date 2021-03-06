import Ember from 'ember';
import DiscussionParsedContentMixin from '../mixins/discussion-parsed-content';

export default Ember.Component.extend(
	DiscussionParsedContentMixin,
	{
		canEdit: Ember.computed.and('currentUser.isAuthenticated', 'guidelines.permissions.canEdit'),
		content: Ember.computed.alias('guidelines.value'),
		currentUser: Ember.inject.service(),
		shouldActivateLinks: true,
		shouldTruncateContent: false,

		actions: {
			openGuidelinesEditor() {
				this.sendAction('openGuidelinesEditor', this.get('guidelines'));
			},
		}
	}
);
