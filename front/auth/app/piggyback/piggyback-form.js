import PasswordForm from '../common/password-form';
import {trackActions} from 'common/utils/track';

export default class PiggybackForm extends PasswordForm {

	/**
	 * @param {Element} form
	 */
	constructor(form) {
		super(form, {
			category: 'piggyback-mobile',
			pageType: '/piggyback'
		});
	}

	/**
	 * @protected
	 *
	 * @param {array} parameters
	 */
	extractFieldsFromPathParameters(parameters) {
	}

	/**
	 * @protected
	 *
	 * @returns {object} data to be send
	 */
	collectDataBeforeSubmit() {
		return {
			username: this.form.elements.targetUsername.value,
			username: this.form.elements.username.value,
			password: this.form.elements.password.value,
		};
	}

	/**
	 * @protected
	 *
	 * @returns {void}
	 */
	onInit() {

	}

	/**
	 * @protected
	 */
	getI18nParameters() {

	}
}

