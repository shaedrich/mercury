import Ember from 'ember';

const PollAnswer = Ember.Object.extend({
    id: null,
    count: null,
    text: null,
    percent: 0,
    chosenByThisUser: false,
});

PollAnswer.reopenClass({
    create(pollAnswerData, pollAnswerCount) {
        let pollAnswer = pollAnswerData;
        var chosen = false;

        if (pollAnswer.id == 2) {
            chosen = true;
        }

        return this._super({
            id: pollAnswer.id,
            count: pollAnswer.count,
            text: pollAnswer.text,
            percent: Math.floor((pollAnswer.count / pollAnswerCount) * 100),
            chosenByThisUser: chosen
        });
    }
});

export default PollAnswer;
