import {getEnvironment, stripDevboxDomain} from '../app/lib/utils';

/* eslint max-len:0 */

/**
 * Base settings for application
 * @example
 * var localConfig = require('./config').settings
 */

/**
 * @typedef {string[]} LoggerInterface
 */

/**
 * @typedef {Object} GAAccount
 * @property {string} id - ie. 'UA-32129070-1'
 * @property {string} [prefix] - namespace prefix for _gaq.push methods, ie. 'special'
 * @property {number} sampleRate - sampling percentage, from 1 to 100
 */

/**
 * @typedef {Object} GAAccountConfig
 * @property {GAAccount} primary
 * @property {GAAccount} ads
 * @property {GAAccount} special
 * @property {string} scriptUrl
 */

/**
 * @typedef {Object} ClickStreamConfig
 * @property {ClickStreamConfigItem} auth
 */

/**
 * @typedef {Object} ClickStreamConfigItem
 * @property {boolean} enable
 * @property {string} url
 */

/**
 * @typedef {Object} Settings
 * @property {string} [authCookieDomain]
 * @property {number} backendRequestTimeout
 * @property {string} cdnBaseUrl
 * @property {string} [devboxDomain]
 * @property {string} domain
 * @property {*} environments
 * @property {HeliosSettings} helios
 * @property {WhoAmIServiceSettings} whoAmIService
 * @property {*} host
 * @property {string} ironSecret
 * @property {string} [mediawikiDomain]
 * @property {string} gaUserSalt
 * @property {LoggerInterface} loggers
 * @property {number} maxRequestsPerChild
 * @property {OptimizelySettings} [optimizely]
 * @property {number} port
 * @property {PrerenderSettings} prerender
 * @property {number} proxyMaxRedirects
 * @property {string} redirectUrlOnNoData
 * @property {string} servicesDomain
 * @property {TrackingSettings} tracking
 * @property {*} verticalColors
 * @property {number} workerCount
 * @property {number} workerDisconnectTimeout
 * @property {FacebookSettings} facebook
 * @property {PatternsSettings} patterns
 * @property {ClickStreamConfig} clickstream
 */

/**
 * @typedef {Object} HeliosSettings
 * @property {string} path
 * @property {number} usernameMaxLength
 * @property {number} passwordMaxLength
 */

/**
 * @typedef {Object} WhoAmIServiceSettings
 * @property {string} path
 * @property {number} timeout
 */

/**
 * @typedef {Object} OptimizelySettings
 * @property {boolean} enabled
 * @property {string} scriptPath
 * @property {string} account
 */

/**
 * @typedef {Object} PrerenderSettings
 * @property {string} token
 */

/**
 * @typedef {Object} TrackingSettings
 * @property {GAAccountConfig} ua
 * @property {string} quantserve
 * @property {ComscoreTrackingSettings} comscore
 * @property {KruxTrackingSettings} krux
 */

/**
 * @typedef {Object} ComscoreTrackingSettings
 * @property {string} keyword
 * @property {string} id
 * @property {string} c7
 * @property {string} c7Value
 */

/**
 * @typedef {Object} KruxTrackingSettings
 * @property {string} mobileId
 */

/**
 * @typedef {Object} FacebookSettings
 * @property {number} appId
 */

/**
 * @typedef {Object} PatternsSettings
 * @property {RegExp} mobile
 * @property {RegExp} iPad
 */

/**
 * Base settings for all environments
 */
export default {
	servicesDomain: 'services.wikia.com',
	// Default timeout for backend requests
	// This timeout is the same as the MW app timeout
	backendRequestTimeout: 300000,
	cookiePrefix: 'wikicities',
	domain: 'wikia.com',
	// Targeted environment [prod|preview|verify|dev|testing|staging]
	environment: getEnvironment(process.env.WIKIA_ENVIRONMENT),
	helios: {
		path: '/auth',
		timeout: 3000
	},
	userRegistationService: {
		path: '/user-registration',
		usernameMaxLength: 50,
		passwordMaxLength: 50,
		timeout: 3000
	},
	userPreferencesService: {
		baseAPIPath: 'user-preference'
	},
	imageReview: {
		baseAPIPath: 'image-review'
	},
	ironSecret: 'TEST_SECRET_REPLACE_THIS',
	// NOTE: On your devbox, use your eth0 address in able to bind route to something accessible
	host: process.env.HOST,
	mediawikiDomain: process.env.MEDIAWIKI_DOMAIN || null,
	// Special salt for calculating GA userID
	gaUserSalt: process.env.GA_USERID_SALT,
	// By default send logs to local syslog only. Possible targets are [syslog, console, default]
	// The value represent the minimum logging level
	loggers: {
		syslog: 'debug'
	},
	devboxDomain: stripDevboxDomain(process.env.HOST || process.env.LOGNAME),
	// auth pages aren't supported on custom domains, so this value should only be used for auth features
	// once we phase out custom domains, we can change this to "cookieDomain" and use it for more features
	authCookieDomain: '.wikia.com',
	authCookieExpiry: 315360000000,
	maxRequestsPerChild: parseInt(process.env.MAX_REQUEST_PER_CHILD, 10) || 50000,
	optimizely: {
		enabled: true,
		scriptPath: 'https://cdn.optimizely.com/js/',
		account: '2449650414'
	},
	port: process.env.PORT || 8000,
	prerender: {
		token: process.env.PRERENDER_TOKEN
	},
	proxyMaxRedirects: 3,
	redirectUrlOnNoData: 'http://community.wikia.com/wiki/Community_Central:Not_a_valid_Wikia',
	tracking: {
		ua: {
			primary: {
				id: 'UA-32129070-1',
				sampleRate: 100
			},
			ads: {
				prefix: 'ads',
				id: 'UA-32129071-1',
				sampleRate: 100
			},
			special: {
				prefix: 'special',
				id: 'UA-32132943-1',
				sampleRate: 100
			},
			scriptUrl: 'https://www.google-analytics.com/analytics.js'
		},
		quantserve: 'p-8bG6eLqkH6Avk',
		comscore: {
			keyword: 'comscorekw',
			id: '6177433',
			c7: '',
			c7Value: ''
		},
		krux: {
			mobileId: 'JTKzTN3f'
		},
		netzathleten: {
			enabled: false,
			url: '',
			isMainPage: false
		}
	},
	verticalColors: {
		comics: '#ff5400',
		games: '#94d11f',
		books: '#ff7f26',
		movies: '#09d3bf',
		lifestyle: '#ffd000',
		music: '#c819ad',
		tv: '#00b7e0'
	},
	workerCount: parseInt(process.env.WORKER_COUNT, 10) || 1,
	workerDisconnectTimeout: 3000,
	// CDN prefix with no trailing slash
	cdnBaseUrl: '//mercury.nocookie.net',
	facebook: {
		appId: 112328095453510
	},
	clickstream: {
		social: {
			enable: true,
			url: 'https://services.wikia.com/clickstream/events/social'
		},
	},
	translationFiles: ['main', 'image-review', 'infobox-builder'],
	inContextTranslationsEnabled: process.env.MERCURY_INCONTEXT_ENABLED === 'true',
};
