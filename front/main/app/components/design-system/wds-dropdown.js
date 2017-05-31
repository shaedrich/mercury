import Ember from 'ember';

const {Component} = Ember;

export default Component.extend({
	classNames: ['wds-dropdown'],

	onMouseEnter() {},

	actions: {
		mouseEnter() {
			this.get('onMouseEnter')();
		}
	}
});
