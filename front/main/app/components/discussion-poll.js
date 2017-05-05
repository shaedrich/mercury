import Ember from "ember";

const {$, Component} = Ember;

export default Component.extend(
	{
        actions: {
            castVote(poll) {
                debugger;
                poll.vote(2);
            },
            selectAnswer() {
                var $submitVote = $("#submitVote");
                var $answer = $(event.target).find("input");
                $answer.prop("checked", true)
                $submitVote.add("voteId", 2);
                $submitVote.removeClass("voteDisabled");
                $submitVote.addClass("voteEnabled");
            }
    }
});
