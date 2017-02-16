import {trackActions} from 'common/utils/track';
import HttpCodes from '../common/http-codes';
import UrlHelper from '../common/url-helper';
import AuthLogger from '../common/auth-logger';

export default class PiggybackForm {

	/**
	 * @param {Element} form
	 */
	constructor(form) {
		this.form = form;
		this.urlHelper = new UrlHelper();
		this.authLogger = AuthLogger.getInstance();
	}

	/**
	 * @private
	 *
	 * @param {Event} event
	 *
	 * @returns {void}
	 */
	onSubmit(event) {
		event.preventDefault();

		const button = this.form.querySelector('piggyback-submit'),
			data = this.collectDataBeforeSubmit(),
			xhr = new XMLHttpRequest();

		this.clearErrors();
		button.disabled = true;
		xhr.onload = this.handleOnLoad(xhr, button);
		xhr.onerror = this.handleOnError(xhr, button);
		xhr.open('post', this.form.action, true);
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.send(this.urlHelper.urlEncode(data));
	}

	handleOnLoad(xhr, button) {
		return () => {
			button.disabled = false;
			if (xhr.status === HttpCodes.OK) {
				this.onSuccess();
			} else {
				this.handleErrors(xhr);
			}
		}
	}

	handleOnError(xhr, button) {
		return () => {
			button.disabled = false;
			this.onError(xhr);
		};
	}

	/**
	 * @private
	 *
	 * @returns {void}
	 */
	onSuccess() {
		window.location.href = `/wiki/User:${this.form.elements.targetUsername.value}`;
	}

	/**
	 * @protected
	 *
	 * @param xhr
	 */
	handleErrors(xhr) {
		try {
			const response = JSON.parse(xhr.responseText);
			response.errors.forEach(error => {
				this.displayError(`errors.${error}`);
			});
		} catch (e) {
			this.onError(xhr);
		}
	}

	/**
	 * @protected
	 *
	 * @param {XMLHttpRequest} xhr
	 *
	 * @returns {void}
	 */
	onError(xhr) {
		this.authLogger.xhrError(xhr);
		this.displayError('errors.server-error');
	}

	/**
	 * @private
	 *
	 * @returns {void}
	 */
	watch() {
		this.form.addEventListener('submit', this.onSubmit.bind(this));
		this.focusOnFirstInput();
	}

	/**
	 * @private
	 */
	focusOnFirstInput() {
		const input = this.form.elements[0];

		if (input) {
			input.focus();
			input.setSelectionRange(input.value.length, input.value.length);
		}
	}

	/**
	 * @param {string} messageKey
	 *
	 * @returns {void}
	 */
	displayError(messageKey) {
		const errorElement = document.createElement('small');

		errorElement.classList.add('error');
		errorElement.innerHTML = i18n.t(messageKey, {});
		this.form.elements[this.form.elements.length - 2].parentElement.appendChild(errorElement);
	}

	/**
	 * @private
	 *
	 * @returns {void}
	 */
	clearErrors() {
		this.form.querySelectorAll('small.error').forEach(element => {
			element.parentNode.removeChild(element);
		});
	}

	/**
	 * @protected
	 *
	 * @returns {object} data to be send
	 */
	collectDataBeforeSubmit() {
		return {
			targetUsername: this.form.elements.targetUsername.value,
			username: this.form.elements.username.value,
			password: this.form.elements.password.value,
		};
	}

}

