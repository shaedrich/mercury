import Ember from 'ember';
import PollUserInfo from './poll-user-info';
import PollAnswer from './poll-answer';
import request from 'ember-ajax/request';
import DiscussionBaseModel from '../base';

const Poll = DiscussionBaseModel.extend({
	id: null,
	title: null,
	createdAt: null,
	questions: null,
	userInfo: null,
	responseCount: 0,

	vote(answerId) {
	 	return request(M.getDiscussionServiceUrl(`/${this.wikiId}/polls/${this.id}/response`), {
	 		method: 'POST',
			data: JSON.stringify({questionId: answerId}),
            dataType: "text"
        }).then(() => {
            var responseCount = this.get('responseCount');
            responseCount++;
            this.set('userInfo.hasVoted', true);
            this.set('userInfo.questionId', answerId);
            this.set('responseCount', responseCount);
            var answers = this.get('answers');
            for (var i = 0; i < answers.length; i++) {
                var answer = answers.get(i);
                if (answer.id == answerId) {
                    answer.count++;
                    answer.chosenByThisUser = true;
                }
                answer.reCalcPercent(responseCount);
            }
            this.set('answers', answers);
		});
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
			id: poll.id,
			title: poll.title,
			createdAt: poll.created,
			responseCount: poll.responseCount,
			answers: poll.questions.map((answer) => {
				return PollAnswer.create(answer, poll.responseCount, poll.userInfo);
			}),
			userInfo: PollUserInfo.create(poll.userInfo)
		});
	},
});

export default Poll;


