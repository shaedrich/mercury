import Ember from 'ember';

const PollUserInfo = Ember.Object.extend({
	hasVoted: null,
	questionId: null,
});

PollUserInfo.reopenClass({
	/**
	 * @param {object} pollUserInfo
	 *
	 * @returns {Ember.Object}
	 */
	create(pollUserInfo) {
		let userInfo = pollUserInfo;

		return this._super({
			hasVoted: userInfo.hasVoted,
			questionId: userInfo.questionId
		});
	}
});

export default PollUserInfo;
