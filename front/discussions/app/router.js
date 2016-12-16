import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
	location: config.locationType
});

Router.map(function () {
	this.route('discussion', {
		path: '/d'
	}, function () {
		this.route('forum', {
			path: '/f'
		});

		this.route('follow');

		this.route('reported-posts', {
			path: '/reported'
		});

		this.route('post', {
			path: '/p/:postId'
		});

		this.route('reply', {
			path: '/p/:postId/r/:replyId'
		});

		this.route('user', {
			path: '/u/:userId'
		});

		this.route('guidelines', {
			path: '/g'
		});
	});

	// Route to catch all badly formed URLs
	this.route('notFound', {
		path: '/*url'
	});
});

export default Router;
