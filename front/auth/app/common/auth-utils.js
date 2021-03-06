import HttpCodes from './http-codes';
import AuthLogger from './auth-logger';

/**
 * @class AuthUtils
 */
export default class AuthUtils {
	/**
	 * Check whether user has requested Account Close or not.
	 * After that check redirect user to Special:CloseMyAccount/reactivate or source page.
	 *
	 * @param {string} url
	 * @param {string} userId
	 *
	 * @returns {void}
	 */
	static authSuccessCallback(url, userId) {
		const xhr = new XMLHttpRequest(),
			authLogger = AuthLogger.getInstance(),
			redirectUserBack = (url) => {
				// Need to know which window should be reloaded
				const mainWindow = window.opener || window.parent;

				if (mainWindow && pageParams.parentOrigin) {
					mainWindow.postMessage({isUserAuthorized: true}, pageParams.parentOrigin);
					return;
				} else if (url) {
					window.location.href = url;
					return;
				}

				window.location.reload();
			},
			preferencesRequestStartTime = window.performance.now();

		xhr.onload = () => {
			const preferencesRequestEndTime = window.performance.now();

			authLogger.info({
				message: 'Check if account is scheduled to be closed XHR time',
				value: preferencesRequestEndTime - preferencesRequestStartTime,
			});

			if (xhr.status === HttpCodes.OK) {
				const preferences = JSON.parse(xhr.responseText);

				if (preferences.value) {
					return this.loadUrl(pageParams.reactivateAccountUrl);
				}
			} else if (xhr.status !== HttpCodes.NOT_FOUND) {
				authLogger.xhrError(xhr);
			}

			return redirectUserBack(url);
		};
		xhr.onerror = () => {
			authLogger.xhrError(xhr);
			redirectUserBack(url);
		};

		xhr.open('get', `${pageParams.preferenceServiceUrl}${userId}/global/requested-closure-date`, true);
		xhr.withCredentials = true;
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.send();
	}

	/**
	 * @param {string} [url]
	 *
	 * @returns {void}
	 */
	static loadUrl(url) {
		let mainWindow;

		if (pageParams.isModal) {
			mainWindow = window.opener || window.parent;
		} else {
			mainWindow = window;
		}

		if (url) {
			mainWindow.location.href = url;

			if (mainWindow !== window) {
				window.close();
			}
			return;
		}

		mainWindow.location.reload();
	}
}
