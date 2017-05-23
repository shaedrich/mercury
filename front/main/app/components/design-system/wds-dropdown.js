import Ember from 'ember';

const {Component, run} = Ember;

export default Component.extend({
	classNames: ['wds-dropdown'],
	classNameBindings: ['dropdownExpanded:wds-is-active'],

	actions: {
		mouseEnter() {
			run.later(() => {
				this.set('dropdownExpanded', true);
			});
		},

		click(e) {
			if (!this.get('dropdownExpanded')) {
				this.set('dropdownExpanded', true);
				e.preventDefault();
			}
		},

		mouseLeave() {
			this.set('dropdownExpanded', false);
		}
	}
});
