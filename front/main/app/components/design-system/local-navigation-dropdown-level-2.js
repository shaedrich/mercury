import Ember from 'ember';

const {Component, computed} = Ember;

export default Component.extend({
	tagName: '',
	stickedClassName: computed('model', 'currentIndex', function () {
		return this.get('model.items.length') < this.get('currentIndex') + 1 ?
			'wds-is-sticked-to-parent' : '';
	})
});
