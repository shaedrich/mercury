import Ember from 'ember';
import {test, moduleFor} from 'ember-qunit';
import apiStubs from '../api-stubs';
import sinon from 'sinon';

const DiscussionUserDataModelClass = require('main/models/discussion/domain/user-data').default;

moduleFor('model:discussion/domain/reply', 'Unit | Model | Discussion User Data', {
	unit: true,

	beforeEach: function () {
		this.register('model:discussion/domain/user-permissions', Ember.Object);
	}
});

test('Proper User Data model is created from fully set User Data API field', function (assert) {
	const userData = DiscussionUserDataModelClass.create(apiStubs.userData.fullSet);

	assert.ok(userData instanceof DiscussionUserDataModelClass);

	assert.equal(typeof userData.permissions, 'object');
	assert.equal(userData.hasReported, false);
	assert.equal(userData.hasUpvoted, true);
});

test('Proper User Data model is created from User Data API field with missing fields', function (assert) {
	const userData = DiscussionUserDataModelClass.create(apiStubs.userData.missingFlags);

	assert.ok(userData instanceof DiscussionUserDataModelClass);

	assert.equal(typeof userData.permissions, 'object');
	assert.equal(userData.hasReported, false);
	assert.equal(userData.hasUpvoted, false);
});
