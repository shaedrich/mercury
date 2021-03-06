import Ember from 'ember';

export default Ember.Component.extend(
	{
		classNames: ['discussion-dropdown'],

		isDropdownActive: false,
		hasLinesBetween: true,

		closeDropdown() {
			this.set('isDropdownActive', false);
		},

		openDropdown() {
			// Needs to run later so that it does not intercept a currently bubbling click
			Ember.run.later(() => {
				this.$(window.document).one('click', this.closeDropdown.bind(this));
				this.set('isDropdownActive', true);
			});
		},

		actions: {
			openDropdown() {
				if (!this.get('isDropdownActive')) {
					this.openDropdown();
				}
			}
		}
	}
);
