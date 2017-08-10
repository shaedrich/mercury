import Ember from 'ember';

const {Component, computed} = Ember;

export default Component.extend({
	tagName: '',
	stickedClassName: computed('item', 'currentIndex', function () {
		return this.get('item.items.length') < this.get('currentIndex') + 1 ?
			'wds-is-sticked-to-parent' : '';
	})
});
