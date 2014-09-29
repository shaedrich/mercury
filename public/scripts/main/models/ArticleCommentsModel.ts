/// <reference path="../app.ts" />

'use strict';

App.ArticleCommentsModel = Em.Object.extend({
	articleId: null,
	comments: null,
	users: null,
	pagesCount: null,
	page: 0,

	fetch: function () {
		var page = this.get('page');

		if (page && page >= 0) {
			return new Em.RSVP.Promise((resolve: Function, reject: Function) => {
				Em.$.ajax({
					url: this.url(this.get('articleId'), page),
					success: (data) => {
						this.setProperties(data.payload);
						resolve(this);
					},
					error: (data) => {
						reject(data);
					}
				});
			});
		}
	}.observes('page', 'articleId'),

	url: function (articleId: number, page: number = 0) {
		return App.get('apiBase') + '/article/comments/' + articleId + '/' + page;
	}
});
