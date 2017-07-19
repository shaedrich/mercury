import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import sass from 'node-sass';
import Logger from '../../lib/logger';

export default (request, reply) => {
	sass.render({
		includePaths: [
			'front/main/app/styles/',
			'front/'
		],
		data: `@import 'app.scss';`,
		outputStyle: 'compressed',
		sourceComments: 'none'
	}, (err, result) => {
		if (err) {
			Logger.fatal(err, 'Sass parsing error');
			return reply('error');
		}
		Logger.info('sass parsing time:', result.stats.duration);
		const timeBeforeAutoprefixer = Date.now();

		postcss([autoprefixer]).process(result.css).then((result) => {
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
