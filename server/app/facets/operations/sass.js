import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import sass from 'node-sass';
import Logger from '../../lib/logger';

export default (request, reply) => {
	const whitelist = [
			'color-community-header',
			'color-links',
			'color-page'
		],
		sassVariables = Object.keys(request.query)
			.filter((key) => {
				return whitelist.indexOf(key) > -1 &&
					request.query[key].length > 0 &&
					// validate if value is valid color hex (this is the only format that comes from wikiWariables
					/^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(request.query[key]);
			})
			.map((key) => {
				return `$${key}: ${request.query[key]};`;
			})
			.join('');

	sass.render({
		includePaths: [
			'front/main/app/styles/',
			'front/'
		],
		data: `${sassVariables} @import 'runtime.scss';`,
		outputStyle: 'compressed',
		sourceComments: 'none'
	}, (err, result) => {
		if (err) {
			Logger.fatal(err, 'Sass parsing error');
			return reply('error');
		}
		Logger.info('sass parsing time:', result.stats.duration);
		const timeBeforeAutoprefixer = Date.now();

		postcss([autoprefixer({
			browsers: ['last 2 version', 'last 3 iOS versions', '> 1%'],
			cascade: false,
			map: false
		})]).process(result.css).then((result) => {
			console.log('autoprefixer time: ', Date.now() - timeBeforeAutoprefixer);

			result.warnings().forEach((warn) => {
				console.warn(warn.toString());
			});

			const response = reply(result.css);
			response.code(200);
			response.type('text/css; charset=utf-8');
		});
	});
};
