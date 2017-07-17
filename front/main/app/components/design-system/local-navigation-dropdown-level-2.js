import Ember from 'ember';

const {Component, computed} = Ember;

export default Component.extend({
	tagName: '',
	stickedClassName: computed('item', 'currentIndex', function () {
		console.log(this.get('item'));
		return this.get('item.items.length') < this.get('currentIndex') + 1 ?
			'wds-is-sticked-to-parent' : '';
	})
});
