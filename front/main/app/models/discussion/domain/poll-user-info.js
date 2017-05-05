import Ember from 'ember';

const PollUserInfo = Ember.Object.extend({
	hasAnswered: null,
	answerId: null,
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
			hasAnswered: userInfo.hasVoted,
			answerId: userInfo.answerId
		});
	}
});

export default PollUserInfo;
