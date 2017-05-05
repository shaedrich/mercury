import Ember from 'ember';

const PollAnswer = Ember.Object.extend({
    id: null,
    count: null,
    text: null,
});

PollAnswer.reopenClass({
    create(pollAnswerData) {
        let pollAnswer = pollAnswerData;

        return this._super({
            id: pollAnswer.id,
            count: pollAnswer.count,
            text: pollAnswer.text
        });
    }
});

export default PollAnswer;
