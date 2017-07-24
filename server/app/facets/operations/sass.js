import autoprefixer from 'autoprefixer';
import flip from 'css-flip';
import postcss from 'postcss';
import sass from 'node-sass';
import Logger from '../../lib/logger';
import {whitelist} from '../../lib/sass-variables';
import settings from '../../../config/settings';

export default (request, reply) => {
	const sassVariables = Object.keys(request.query)
			.filter((key) => {
				return whitelist.indexOf(key) > -1 &&
					request.query[key].length > 0 &&
					// validate if value is valid color hex (this is the only format that comes from wikiWariables
					/^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(request.query[key]);
			})
			.map((key) => {
				return `$${key}: ${request.query[key]};`;
			})
			.join(''),
		isDev = settings.environment === 'dev';

	sass.render({
		includePaths: [
			isDev ? 'www/styles/' : 'styles/'
		],
		data: `${sassVariables} @import 'main/app/styles/runtime.scss';`,
		outputStyle: isDev ? 'expanded' : 'compressed',
		sourceComments: false,
	}, (err, result) => {
		if (err) {
			Logger.fatal(err, 'Sass parsing error');

			const response = reply('Sass parsing error');
			return response.code(503);
		}

		Logger.info('Sass parsing time:', result.stats.duration);
		const timeBeforeAutoprefixer = Date.now();

		postcss([autoprefixer({
			browsers: ['last 2 version', 'last 3 iOS versions', '> 1%'],
			cascade: false,
			map: false
		})]).process(result.css).then((result) => {
			Logger.info('Sass autoprefixer time: ', Date.now() - timeBeforeAutoprefixer);

			result.warnings().forEach((warn) => {
				Logger.warn('Sass autoprefixer warning', warn.toString());
			});

			let css = result.css;

			if (request.query.dir === 'rtl') {
				css = flip(result.css);
			}

			const response = reply(css);
			response.code(200);
			response.type('text/css; charset=utf-8');
		});
	});
};
