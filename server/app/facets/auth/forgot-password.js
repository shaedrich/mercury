import authLocaleSettings from '../../../config/authLocaleSettings';
import * as authUtils from '../../lib/auth-utils';
import * as authView from './auth-view';
import deepExtend from 'deep-extend';
import resetPasswordFor from '../operations/reset-password';
import settings from '../../../config/settings';
import translateError from './translate-error';
import querystring from 'querystring';

function getForgotPasswordViewContext(request) {
	const i18n = request.server.methods.i18n.getInstance(),
		lang = authUtils.getLanguageWithDefault(i18n);

	const context = deepExtend(authView.getDefaultContext(request),
		{
			bodyClasses: 'two-cards-page forgot-password-page',
			firstCard: {
				headerCallout: 'auth:signin.register-callout',
				headerCalloutLink: 'auth:signin.register-now',
				headerHref: authUtils.getRegisterUrl(request),
				headerText: 'auth:forgot-password.header'
			},
			firstCardPartial() {
				return 'auth/forgot-password';
			},
			pageType: 'forgot-password-page',
			secondCard: {
				headerText: 'auth:confirm-forgot-password.header',
			},
			secondCardPartial() {
				return 'auth/forgot-password-check-email';
			},
			title: 'auth:forgot-password.title',
			username: request.query.username || '',
			usernameMaxLength: settings.userRegistationService.usernameMaxLength
		}
	);

	if (request.query.tokenExpired === '1') {
		context.pageParams.tokenExpired = true;
	}

	context.pageParams.contactFandomLink =
		`<a href="${authLocaleSettings[lang].urls.contactFandomLinkUrl}" target="_blank">` +
		`${i18n.t('auth:forgot-password.invalid-email-contact-fandom')}</a>`;

	return context;
}

/**
 * @param {Hapi.Request} request
 * @param {*} reply
 */
export function get(request, reply) {
	const context = getForgotPasswordViewContext(request);

	if (request.auth.isAuthenticated) {
		return authView.onAuthenticatedRequestReply(request, reply, context);
	}

	return authView.view('cards', context, request, reply, 'card');
}

/**
 * @param {Hapi.Request} request
 * @param {*} reply
 */
export function post(request, reply) {
	const redirect = querystring.escape(request.payload.redirect),
		username = querystring.escape(request.payload.username);

	if (username === 'test-user') {
		reply({
			payload: 'ok'
		}).code(200);
	} else {
		resetPasswordFor(username, redirect, request)
			.then(data => {
				reply({
					payload: data.payload
				}).code(200);
			}).catch(data => {
				const errors = translateError(data, (error) => {
					let errorHandler = 'server-error';

					if (error.description === 'user_is_blocked') {
						errorHandler = 'username_blocked';
					} else if (error.description === 'user_doesnt_exist') {
						errorHandler = 'username-not-recognized';
					}

					return errorHandler;
				});

				reply({
					errors,
				}).code(data.response.statusCode);
			});
	}
}
