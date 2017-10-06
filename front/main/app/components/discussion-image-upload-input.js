import Ember from 'ember';
import {trackButtonClicked} from '../utils/image-upload-tracker';

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
		click(event) {
			// due to <label><input></label> there are two events broadcast - we don't want to track both
			if (event.target.tagName !== 'INPUT') {
				trackButtonClicked();
			}
		},
	}
);
