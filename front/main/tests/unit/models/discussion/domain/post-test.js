import Ember from 'ember';
import {test, moduleFor} from 'ember-qunit';
import apiStubs from '../api-stubs';
import sinon from 'sinon';

const DiscussionPostModelClass = require('main/models/discussion/domain/post').default;

moduleFor('model:discussion/domain/post', 'Unit | Model | Discussion Post', {
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

test('Proper DiscussionPost is being created from API Thread', function (assert) {
	const post = DiscussionPostModelClass.createFromThreadData(apiStubs.thread);

	checkDiscussionPost(assert, post);
});

test('Proper DiscussionPost is being created from API Post', function (assert) {
	const post = DiscussionPostModelClass.createFromPostListData(apiStubs.post);

	checkDiscussionPost(assert, post);
});
