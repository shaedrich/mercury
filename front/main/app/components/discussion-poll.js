import Ember from "ember";

const {$, Component} = Ember;

export default Component.extend(
	{
        actions: {
            castVote(poll) {
                var $inputs = $("input.clickable");
                for (var i = 0; i < $inputs.length; i++) {
                    if ($inputs.get(i).checked) {
                        poll.vote($inputs.get(i).value)
                        break;
                    }
                }
            },
            selectAnswer() {
                var $submitVote = $("#submitVote");
                var $answer = $(event.target).find("input");
                $answer.prop("checked", true);
                $submitVote.removeClass("voteDisabled");
                $submitVote.addClass("voteEnabled");
            }
    }
});
