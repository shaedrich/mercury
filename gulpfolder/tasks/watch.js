var gulp = require('gulp'),
	gutil = require('gulp-util'),
	log = require('../util/logger'),
	paths = require('../paths');

gulp.task('watch', function () {
	log('Watching files');

	gulp.watch(paths.styles.in, ['sass']).on('change', function (event) {
		log('Style changed:', gutil.colors.green(event.path));
	});

	gulp.watch(paths.scripts.front.in, ['scripts:front']).on('change', function (event) {
		log('Script changed:', gutil.colors.green(event.path));
	});

	gulp.watch(paths.scripts.back.in, ['scripts:back']).on('change', function (event) {
		log('Script for backend changed:', gutil.colors.green(event.path));
	});

	gulp.watch(paths.templates.in, ['templates']).on('change', function (event) {
		log('Template changed:', gutil.colors.green(event.path));
	});

	gulp.watch(paths.views.in, ['views']).on('change', function (event) {
		log('Views changed:', gutil.colors.green(event.path));
	});

	gulp.watch(paths.svg.in, ['sprites']).on('change', function (event) {
		log('Svg changed:', gutil.colors.green(event.path));
	});
});
