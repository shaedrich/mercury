import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
	location: config.locationType
});

Router.map(function () {
	// we use here wilcard instead of a dynamic segment to be able to
	// handle in builder also sub-templates (with /)
	this.route('infobox-builder', {
		path: '/infobox-builder/*templateName'
	});

	this.route('infobox-builder');

	this.route('curatedContentEditor', {
		path: '/main/edit'
	}, function () {
		this.route('section', {
			path: '/section/:section'
		}, function () {
			this.route('edit');

			this.route('addItem', {
				path: '/add'
			});

			this.route('editItem', {
				path: '/:item/edit'
			});
		});

		this.route('communityData', {
			path: '/community'
		});

		this.route('sectionAdd', {
			path: '/curated/add'
		});

		this.route('blockAddItem', {
			path: '/:block/add'
		});

		this.route('blockEditItem', {
			path: '/:block/:item/edit'
		});

		// When user tries to load invalid path under /main/edit/* we redirect to /main/edit
		this.route('invalid', {
			path: '/*url'
		});
	});

	this.route('image-review', function () {
		this.route('index', {
			path: '/'
		});

		this.route('batch-id', {
			path: '/batch/:batchId'
		});

		this.route('summary', {
			path: '/summary'
		});

		this.route('error', {
			path: '/error'
		});

		this.route('coppa', function () {
			this.route('index', {
				path: '/'
			});

			this.route('user-images', {
				path: '/:username'
			});
		});
	});
});

export default Router;
