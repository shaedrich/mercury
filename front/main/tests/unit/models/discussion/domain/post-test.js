import Ember from 'ember';
import {test, moduleFor} from 'ember-qunit';
import sinon from 'sinon';

const DiscussionPostModelClass = require('main/models/discussion/domain/post').default;

moduleFor('model:discussion/domain/entities', 'Unit | Model | Discussion Entities', {
	unit: true,

	beforeEach: function () {
		this.register('model:discussion/domain/user-data', Ember.Object);
		this.register('model:discussion/domain/entity', Ember.Object);
		this.register('model:discussion/domain/contributor', Ember.Object);
	}
});

function checkDiscussionPost(assert, post) {
	assert.ok(post instanceof DiscussionPostModelClass);
	assert.equal(typeof post.createdBy, 'object');
	assert.equal(typeof post.creationTimestamp, 'number');
	assert.equal(typeof post.id, 'string');
	assert.equal(typeof post.isDeleted, 'boolean');
	assert.equal(typeof post.isLocked, 'boolean');
	assert.equal(typeof post.isNew, 'boolean');
	assert.equal(typeof post.isReported, 'boolean');
	assert.equal(typeof post.isRequesterBlocked, 'boolean');
	assert.equal(typeof post.rawContent, 'string');
	assert.equal(typeof post.repliesCount, 'number');
	assert.equal(typeof post.threadId, 'string');
	assert.equal(typeof post.title, 'string');
	assert.equal(typeof post.upvoteCount, 'number');
}

test('Proper DiscussionPost is being created from API Post', function (assert) {
	const post = DiscussionPostModelClass.createFromThreadData({
		"_links": {
			"self": {
				"href": "/3035/threads/2735567199551882856?viewableOnly=true&limit=10&page=0&sortKey=creation_date&sortDirection=descending&responseGroup=small"
			},
			"first": [
				{
					"href": "/3035/threads/2735567199551882856?viewableOnly=true&limit=10&page=0&sortKey=creation_date&sortDirection=descending&responseGroup=small"
				}
			]
		},
		"createdBy": {
			"id": "28287872",
			"avatarUrl": "http://static.wikia.nocookie.net/9c03e89e-ad22-4e10-ab39-cf66a3cf38c5/scale-to-width-down/100",
			"name": "KK1133RR33NN"
		},
		"creationDate": {
			"nano": 0,
			"epochSecond": 1462196622
		},
		"firstPostId": "2735567199560271466",
		"forumId": "3035",
		"forumName": "Discussions",
		"id": "2735567199551882856",
		"isEditable": true,
		"isReported": false,
		"isRequesterBlocked": false,
		"lastPostId": "2735570383875868347",
		"modificationDate": {
			"nano": 0,
			"epochSecond": 1462197001
		},
		"page": "0",
		"postCount": 1,
		"rawContent": "Any one else playing new survival mode? No quick saves are a bitch! Especially when your new characters only level 7. Going along minding my own business then BOOM music changes and BANG!! Bitch slapped by a deathclaw  ",
		"renderedContent": null,
		"requesterId": "0",
		"siteId": "3035",
		"title": "",
		"trendingScore": 7247.1783,
		"upvoteCount": 1,
		"viewCount": 0,
		"_embedded": {
			"userData": [
				{
					"hasReported": false,
					"hasUpvoted": false
				}
			],
			"firstPost": [
				{
					"_links": {
						"self": {
							"href": "/3035/posts/2735567199560271466"
						},
						"permalink": [
							{
								"href": "/3035/permalinks/posts/2735567199560271466?viewableOnly=true"
							}
						],
						"up": [
							{
								"href": "/3035/threads/2735567199551882856"
							}
						]
					},
					"createdBy": {
						"id": "28287872",
						"avatarUrl": "http://static.wikia.nocookie.net/9c03e89e-ad22-4e10-ab39-cf66a3cf38c5/scale-to-width-down/100",
						"name": "KK1133RR33NN"
					},
					"creationDate": {
						"nano": 0,
						"epochSecond": 1462196622
					},
					"creatorId": "28287872",
					"deletedPosition": null,
					"id": "2735567199560271466",
					"isEditable": true,
					"isReported": false,
					"isRequesterBlocked": false,
					"latestRevisionId": "2735567199560271465",
					"modificationDate": {
						"nano": 0,
						"epochSecond": 1462196960
					},
					"position": null,
					"rawContent": "Any one else playing new survival mode? No quick saves are a bitch! Especially when your new characters only level 7. Going along minding my own business then BOOM music changes and BANG!! Bitch slapped by a deathclaw  ",
					"renderedContent": null,
					"requesterId": "0",
					"siteId": "3035",
					"threadId": "2735567199551882856",
					"title": "",
					"upvoteCount": 1
				}
			]
		}
	});

	checkDiscussionPost(assert, post);
});

test('Proper DiscussionPost is being created from API Post', function (assert) {
	const post = DiscussionPostModelClass.createFromPostListData({
		"_links": {
			"self": {
				"href": "/3035/posts/2735594967983457833"
			},
			"permalink": [
				{
					"href": "/3035/permalinks/posts/2735594967983457833?viewableOnly=true"
				}
			],
			"up": [
				{
					"href": "/3035/threads/2735215237115413593"
				}
			]
		},
		"createdBy": {
			"id": "28358557",
			"avatarUrl": null,
			"name": "Hvkgil"
		},
		"creationDate": {
			"nano": 0,
			"epochSecond": 1462199932
		},
		"creatorId": "28358557",
		"deletedPosition": null,
		"id": "2735594967983457833",
		"isEditable": true,
		"isReply": true,
		"isReported": false,
		"isRequesterBlocked": false,
		"latestRevisionId": "2735594967975069224",
		"modificationDate": {
			"nano": 0,
			"epochSecond": 1462199933
		},
		"position": 7,
		"rawContent": "I have a few skill points I'll dump some into robotics and science just in case",
		"renderedContent": null,
		"requesterId": "0",
		"siteId": "3035",
		"threadCreatedBy": {
			"id": "28358557",
			"avatarUrl": null,
			"name": "Hvkgil"
		},
		"threadId": "2735215237115413593",
		"title": null,
		"upvoteCount": 0,
		"_embedded": {
			"thread": [
				{
					"creatorId": "28358557",
					"isEditable": true,
					"isReported": false,
					"postCount": "7",
					"title": ""
				}
			]
		}
	});

	checkDiscussionPost(assert, post);
});
