import Ember from 'ember';

const {Component, computed} = Ember;

export default Component.extend({
	classNameBindings: [
		'isClicked:wds-is-clicked',
		'dropdownExpanded:wds-is-active',
		'hasShadow:wds-has-shadow',
		'hasDarkShadow:wds-has-dark-shadow',
		'isLevel2:wds-dropdown-level-2:wds-dropdown'
	],
	isLevel2: false,
	onMouseEnter() {},

	isTouchDevice: computed(() => {
		return ('ontouchstart' in window);
	}),

	actions: {
		click(event) {
			if (this.get('isTouchDevice') && !this.get('isClicked')) {
				this.set('isClicked', true);
				event.preventDefault();
			}
		},

		mouseEnter() {
			this.get('onMouseEnter')();
		},

		mouseLeave() {
			if (this.get('isTouchDevice')) {
				this.set('isClicked', false);
			}
		}
	}
});
