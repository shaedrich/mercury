import Ember from 'ember';

const {Component, isEmpty} = Ember;

export default Component.extend(
	{
		/**
		 * @param {Event} event
		 * @returns {void}
		 */
		change(event) {
			const input = event.target;
			if (!isEmpty(input.files)) {
				this.get('onImageSelected')(input.files);
			}
		},

		/**
		 * @returns {void}
		 */
		click() {
			this.sendAction('click');
		},
	}
);
