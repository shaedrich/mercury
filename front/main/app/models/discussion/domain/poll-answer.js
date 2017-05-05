import Ember from 'ember';

const PollAnswer = Ember.Object.extend({
    id: null,
    count: null,
    text: null,
    percent: 0,
    chosenByThisUser: false,

    reCalcPercent(responseCount) {
        this.percent = Math.floor((this.count / responseCount) * 100);
    }
});

PollAnswer.reopenClass({
    create(pollAnswerData, responseCount, pollUserInfo) {
        let pollAnswer = pollAnswerData;

        return this._super({
            id: pollAnswer.id,
            count: pollAnswer.count,
            text: pollAnswer.text,
            percent: Math.floor((pollAnswer.count / responseCount) * 100),
            chosenByThisUser: pollUserInfo.hasVoted && pollUserInfo.questionId === pollAnswer.id
        });
    },

});

export default PollAnswer;
