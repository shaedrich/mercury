import Ember from 'ember';
import {track, trackActions} from '../utils/discussion-tracker';

const {Component, computed: {reads}} = Ember;

export default Component.extend({
	classNames: ['discussion-left-rail'],

	userProfile: reads('users.0'),

	actions: {
		trackAvatarClick() {
			track(trackActions.LeftRailHeaderAvatarClicked);
		}
	}
});
