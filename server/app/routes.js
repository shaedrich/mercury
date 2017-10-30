import Hoek from 'hoek';
import {Interval, Policy} from './lib/caching';
import {getRedirectUrlWithQueryString} from './lib/auth-utils';
import proxyMW from './facets/operations/proxy-mw';
import {handler as assetsHandler} from './facets/operations/assets';
import heartbeatHandler from './facets/operations/heartbeat';
import logoutHandler from './facets/auth/logout';
import signOutHandler from './facets/auth/signout';
import joinHandler from './facets/auth/join';
import {validateRedirect} from './facets/auth/auth-view';
import * as forgotPasswordHandler from './facets/auth/forgot-password';
import registerHandler from './facets/auth/register';
import * as resetPasswordHandler from './facets/auth/reset-password';
import * as signinHandler from './facets/auth/signin';
import * as piggybackHandler from './facets/auth/piggyback';
import confirmEmailHandler from './facets/auth/confirm-email';
import showApplication from './facets/show-application';

/**
 * @typedef {Object} RouteDefinition
 * @property {string[]|string} method
 * @property {string} path
 * @property {Function} handler
 * @property {*} [config]
 */

const routeCacheConfig = {
		privacy: Policy.Public,
		expiresIn: 60000
	},
	unauthenticatedRouteConfig = {
		config: {
			cache: routeCacheConfig,
			auth: false
		}
	},
	authenticatedRouteConfig = {
		config: {
			auth: {
				mode: 'try',
				strategy: 'session'
			}
		}
	};

// routes that don't care if the user is logged in or not, i.e. lazily loaded modules
let routes,
	unauthenticatedRoutes = [
		{
			method: 'GET',
			path: '/favicon.ico',
			handler: proxyMW
		},
		{
			method: 'GET',
			path: '/robots.txt',
			handler: proxyMW
		},
		{
			method: 'GET',
			path: '/front/{path*}',
			handler: assetsHandler
		},
		{
			method: 'GET',
			path: '/heartbeat',
			handler: heartbeatHandler
		}
	],
	// routes where we want to know the user's auth status
	authenticatedRoutes = [
		// Authentication Routes - The following routes should be related to authentication
		{
			method: 'GET',
			path: '/join',
			handler: joinHandler,
			config: {
				pre: [
					{
						method: validateRedirect
					}
				]
			}
		},
		{
			method: 'GET',
			path: '/signin',
			handler: signinHandler.get,
			config: {
				pre: [
					{
						method: validateRedirect
					}
				]
			}
		},
		{
			method: 'POST',
			path: '/signin',
			handler: signinHandler.post,
			config: {
				pre: [
					{
						method: validateRedirect
					}
				]
			}
		},
		{
			method: 'GET',
			path: '/piggyback',
			handler: piggybackHandler.get,
			config: {
				pre: [
					{
						method: validateRedirect
					}
				]
			}
		},
		{
			method: 'POST',
			path: '/piggyback',
			handler: piggybackHandler.post,
			config: {
				pre: [
					{
						method: validateRedirect
					}
				]
			}
		},
		{
			method: 'GET',
			path: '/register',
			handler: registerHandler,
			config: {
				pre: [
					{
						method: validateRedirect
					}
				]
			}
		},
		{
			method: 'GET',
			path: '/confirm-email',
			handler: confirmEmailHandler,
		},
		{
			method: 'GET',
			path: '/forgot-password',
			handler: forgotPasswordHandler.get,
			config: {
				pre: [
					{
						method: validateRedirect
					}
				]
			}
		},
		{
			method: 'POST',
			path: '/forgot-password',
			handler: forgotPasswordHandler.post,
			config: {
				pre: [
					{
						method: validateRedirect
					}
				]
			}
		},
		{
			method: 'GET',
			path: '/reset-password',
			handler: resetPasswordHandler.get,
			config: {
				pre: [
					{
						method: validateRedirect
					}
				]
			}
		},
		{
			method: 'POST',
			path: '/reset-password',
			handler: resetPasswordHandler.post,
			config: {
				pre: [
					{
						method: validateRedirect
					}
				]
			}
		},
		{
			method: 'GET',
			path: '/login',
			/**
			 * @param {Hapi.Request} request
			 * @param {*} reply
			 * @returns {Hapi.Response}
			 */
			handler(request, reply) {
				return reply.redirect(getRedirectUrlWithQueryString('signin', request));
			}
		},
		{
			method: 'GET',
			path: '/signup',
			/**
			 * @param {Hapi.Request} request
			 * @param {*} reply
			 * @returns {Hapi.Response}
			 */
			handler(request, reply) {
				return reply.redirect(getRedirectUrlWithQueryString('register', request));
			}
		},
		{
			method: 'POST',
			path: '/signout',
			handler: signOutHandler
		},
		{
			method: 'POST',
			path: '/logout',
			handler: signOutHandler
		},
		{
			method: 'GET',
			path: '/logout',
			handler: logoutHandler
		},
		{
			method: 'GET',
			path: '/image-review',
			handler: showApplication,
			config: {
				cache: routeCacheConfig
			}
		},
		{
			method: 'GET',
			path: '/image-review/batch/{batchId*}',
			handler: showApplication,
			config: {
				cache: routeCacheConfig
			}
		},
		{
			method: 'GET',
			path: '/image-review/summary',
			handler: showApplication,
			config: {
				cache: routeCacheConfig
			}
		},
		{
			method: 'GET',
			path: '/image-review/error',
			handler: showApplication,
			config: {
				cache: routeCacheConfig
			}
		},
		{
			method: 'GET',
			path: '/image-review/coppa',
			handler: showApplication,
			config: {
				cache: routeCacheConfig
			}
		},
		{
			method: 'GET',
			path: '/image-review/coppa/{username*}',
			handler: showApplication,
			config: {
				cache: routeCacheConfig
			}
		},
		{
			method: 'GET',
			// Catch invalid paths and redirect to the main page
			path: '/main/{invalid}',
			/**
			 * @param {Hapi.Request} request
			 * @param {*} reply
			 * @returns {Hapi.Response}
			 */
			handler(request, reply) {
				return reply.redirect('/');
			},
			config: {
				cache: routeCacheConfig
			}
		},
		{
			method: 'GET',
			// We don't care if there is a dynamic segment, Ember router handles that
			path: '/main/edit/{ignore*}',
			handler: showApplication,
			config: {
				cache: routeCacheConfig
			}
		},
		{
			method: 'GET',
			// We don't care if there is a dynamic segment, Ember router handles that
			path: '/infobox-builder/{ignore*}',
			handler: showApplication,
			config: {
				cache: routeCacheConfig
			}
		},
	];

/**
 * @param {*} route
 * @returns {*}
 */
unauthenticatedRoutes = unauthenticatedRoutes.map((route) => {
	return Hoek.applyToDefaults(unauthenticatedRouteConfig, route);
});

/**
 * @param {*} route
 * @returns {*}
 */
authenticatedRoutes = authenticatedRoutes.map((route) => {
	return Hoek.applyToDefaults(authenticatedRouteConfig, route);
});

routes = unauthenticatedRoutes.concat(authenticatedRoutes);

export {routes};
