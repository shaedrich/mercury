import Ember from 'ember';

const {Component} = Ember;

export default Component.extend({
	classNames: ['wds-dropdown'],

	actions: {
		mouseEnter() {
			const onMouseEnter = this.get('onMouseEnter');

			if (typeof onMouseEnter === 'function') {
				onMouseEnter();
			}
		}
	}
});
