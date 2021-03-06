/* global module */
/* eslint-env es6, node */

const EmberApp = require('ember-cli/lib/broccoli/ember-app'),
	Funnel = require('broccoli-funnel');

module.exports = function (defaults) {
	const app = new EmberApp(defaults, {
		autoprefixer: {
			browsers: ['last 2 version', 'last 3 iOS versions', '> 1%'],
			cascade: false,
			map: false
		},
		inlineContent: {
			baseline: 'vendor/baseline.js',
			$script: 'bower_components/script.js/dist/script.js',
		},
		svgstore: {
			files: [
				{
					sourceDirs: 'app/symbols/main',
					outputFile: '/assets/main.svg'
				},
				{
					sourceDirs: 'app/symbols/discussions',
					outputFile: '/assets/discussions.svg'
				},
				{
					sourceDirs: 'app/symbols/infobox-builder',
					outputFile: '/assets/infobox-builder.svg'
				},
				// This duplicates build-common-symbols task but we still want to do it
				// as there is no easy way to use external rev-manifest.json in here
				{
					sourceDirs: '../common/public/symbols',
					outputFile: '/assets/common.svg'
				}
			]
		},
		outputPaths: {
			app: {
				css: {
					'app-dark-theme': 'assets/app-dark-theme.css'
				},
				html: 'ember-main.hbs',
			}
		},
		fingerprint: {
			extensions: ['js', 'css', 'svg', 'png', 'jpg', 'gif', 'map'],
			generateAssetMap: true,
			replaceExtensions: ['html', 'css', 'js', 'hbs'],
			prepend: 'http://mercury.nocookie.net/mercury-static/main/'
		},
		replace: {
			files: [
				'ember-main.hbs'
			],
			patterns: [{
				match: 'timestamp',
				replacement: new Date().getTime()
			}]
		},
		derequire: {
			patterns: [
				{
					from: 'define',
					to: 'mefine'
				},
				{
					from: 'require',
					to: 'mequire'
				}
			]
		},
		trees: {
			// By default vendor is not watched by Ember CLI and we want to rebuild when common scripts are modified
			vendor: 'vendor'
		},
		vendorFiles: {
			// we'll load jQuery on our own
			'jquery.js': false
		},
		'ember-cli-qunit': {
			useLintTree: false
		}
	});

	// Files below are concatenated to assets/vendor.js
	app.import(`${app.bowerDirectory}/fastclick/lib/fastclick.js`);
	app.import(`${app.bowerDirectory}/hammerjs/hammer.js`);
	app.import(`${app.bowerDirectory}/headroom.js/dist/headroom.js`);
	app.import(`${app.bowerDirectory}/jquery.cookie/jquery.cookie.js`);
	app.import(`${app.bowerDirectory}/ember-hammer/ember-hammer.js`);
	app.import(`${app.bowerDirectory}/i18next/i18next.js`);
	app.import(`${app.bowerDirectory}/vignette/dist/vignette.js`);
	app.import(`${app.bowerDirectory}/numeral/numeral.js`);
	app.import(`${app.bowerDirectory}/weppy/dist/weppy.js`);
	app.import(`${app.bowerDirectory}/visit-source/dist/visit-source.js`);
	app.import(`${app.bowerDirectory}/Autolinker.js/dist/Autolinker.min.js`);
	app.import(`${app.bowerDirectory}/tinycolor/dist/tinycolor-min.js`);
	app.import('vendor/common.js');

	if (app.env === 'test') {
		// Fix for PhantomJS errors
		app.import(`${app.bowerDirectory}/es5-shim/es5-shim.min.js`);
	}

	// Assets which are lazy loaded
	const cropperAssets = new Funnel(`${app.bowerDirectory}/cropper/dist`, {
			include: ['*.min.*'],
			destDir: 'assets/vendor/cropper'
		}),
		jQueryAssets = new Funnel(`${app.bowerDirectory}/jquery/dist`, {
			include: ['*.min.*'],
			destDir: 'assets/vendor/jquery'
		}),
		pontoAssets = new Funnel(`${app.bowerDirectory}/ponto/web/src`, {
			destDir: 'assets/vendor/ponto'
		}),
		numeralAssets = new Funnel(`${app.bowerDirectory}/numeral/languages`, {
			destDir: 'assets/vendor/numeral'
		}),
		designSystemAssets = new Funnel(`${app.bowerDirectory}/design-system/dist/svg/sprite.svg`, {
			destDir: 'assets/design-system.svg'
		});

	return app.toTree([
		jQueryAssets,
		cropperAssets,
		pontoAssets,
		numeralAssets,
		designSystemAssets
	]);
};
