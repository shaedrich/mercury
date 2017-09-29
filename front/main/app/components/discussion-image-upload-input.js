import Ember from 'ember';

const {Component, isEmpty, observer} = Ember;

export default Component.extend(
	{
		reset: false,

		resetObserver: observer('reset', function () {
			if (this.get('reset')) {
				this.$('input').val(null);
				this.set('reset', false);
			}
		}),

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
