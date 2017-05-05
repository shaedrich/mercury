import Ember from 'ember';
import PollUserInfo from './poll-user-info';
import PollAnswer from './poll-answer';
import request from 'ember-ajax/request';

const Poll = Ember.Object.extend({
	id: null,
	title: null,
	createdAt: null,
	questions: null,
	userInfo: null,
	answerCount: 0,

	vote(answerId) {
        debugger;
        // this.set('count', this.get('count') + 1);
        this.set('userInfo.hasAnswered', true);
        this.set('answerCount', this.get('answerCount') + 1);
	 	// return request(M.getDiscussionServiceUrl('/polls/' + this.get('id') + '/vote'), {
	 	// 	method: 'POST',
		// 	data: JSON.stringify([answerId])
        // }).then(() => {
	 	// 	this.set('count', this.get('count') + 1);
		// });
	},
});

Poll.reopenClass({
	create(pollData) {
		let poll = pollData;

		if (Array.isArray(poll)) {
			poll = poll[0];
		}
		if (!poll) {
			return null;
		}

		return this._super({
			title: poll.title,
			createdAt: poll.created,
			answerCount: poll.answerCount,
			answers: poll.questions.map((answer) => {
				return PollAnswer.create(answer, poll.answerCount);
			}),
			userInfo: PollUserInfo.create(poll.userInfo)
		});
	},
});

export default Poll;


