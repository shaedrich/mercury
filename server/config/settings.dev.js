/**
 * settings for application, used by default by dev environments
 */

// These variables are used in multiple places in config
const devDomain = (process.env.WIKIA_DATACENTER === 'poz') ? 'pl' : 'us',
	devEnvironment = (process.env.WIKIA_DATACENTER === 'poz') ? 'poz-dev' : 'sjc-dev',
	servicesDomain = `services.wikia-dev.${devDomain}`;

export default {
	loggers: {
		console: 'debug'
	},
	devDomain,
	authCookieDomain: `.wikia-dev.${devDomain}`,
	servicesDomain,
	facebook: {
		appId: 881967318489580
	},
	optimizely: {
		account: '2441440871'
	},
	qualaroo: {
		scriptUrl: '//s3.amazonaws.com/ki.js/52510/dlS.js'
	},
	port: 7000,
	clickstream: {
		social: {
			enable: true,
			url: `https://${servicesDomain}/clickstream/events/social`
		}
	},
	helios: {
		internalUrl: 'http://dev.${devEnvironment}.k8s.wikia.net/helios',
	},
};
