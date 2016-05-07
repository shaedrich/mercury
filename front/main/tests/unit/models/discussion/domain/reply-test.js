import Ember from 'ember';
import {test, moduleFor} from 'ember-qunit';
import apiStubs from '../api-stubs';
import sinon from 'sinon';

const DiscussionReplyModelClass = require('main/models/discussion/domain/reply').default;

moduleFor('model:discussion/domain/reply', 'Unit | Model | Discussion Reply', {
	unit: true,

	beforeEach: function () {
		this.register('model:discussion/domain/user-data', Ember.Object);
		this.register('model:discussion/domain/entity', Ember.Object);
		this.register('model:discussion/domain/contributor', Ember.Object);
	}
});

function checkDiscussionReply(assert, post) {
	assert.ok(post instanceof DiscussionReplyModelClass);

	assert.equal(typeof post.createdBy, 'object');
	assert.equal(typeof post.creationTimestamp, 'number');
	assert.equal(typeof post.id, 'string');
	assert.equal(typeof post.isDeleted, 'boolean');
	assert.equal(typeof post.isLocked, 'boolean');
	assert.equal(typeof post.isNew, 'boolean');
	assert.equal(typeof post.isReported, 'boolean');
	assert.equal(typeof post.isRequesterBlocked, 'boolean');
	assert.equal(typeof post.rawContent, 'string');
	assert.equal(typeof post.threadId, 'string');
	assert.equal(typeof post.title, 'string');
	assert.equal(typeof post.upvoteCount, 'number');
	assert.equal(typeof post.threadCreatedBy, 'object');

	assert.ok(post.isReply);
}

test('Proper DiscussionReply is being created from API Post', function (assert) {
	const reply = DiscussionReplyModelClass.create(apiStubs.replyPost);

	checkDiscussionReply(assert, reply);
});
