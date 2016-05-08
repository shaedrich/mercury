import Ember from 'ember';
import {test, moduleFor} from 'ember-qunit';
import apiStubs from '../api-stubs';
import sinon from 'sinon';

const DiscussionUserPermissionsModelClass = require('main/models/discussion/domain/user-permissions').default;

moduleFor('model:discussion/domain/post', 'Unit | Model | Discussion User Permissions', {
	unit: true,
});

test('Proper DiscussionUserPermissions object is being created from full set of permissions', function (assert) {
	const userPermissions = DiscussionUserPermissionsModelClass.create(apiStubs.userPermissions.fullSet);

	assert.ok(userPermissions instanceof DiscussionUserPermissionsModelClass);

	assert.equal(userPermissions.canDelete, true);
	assert.equal(userPermissions.canUndelete, true);
	assert.equal(userPermissions.canLock, true);
	assert.equal(userPermissions.canUnlock, true);
	assert.equal(userPermissions.canModerate, true);
});

test('Proper DiscussionUserPermissions object is being created from restricted set of permissions', function (assert) {
	const userPermissions = DiscussionUserPermissionsModelClass.create(apiStubs.userPermissions.missingFlags);

	assert.ok(userPermissions instanceof DiscussionUserPermissionsModelClass);

	assert.equal(userPermissions.canDelete, false);
	assert.equal(userPermissions.canUndelete, false);
	assert.equal(userPermissions.canLock, true);
	assert.equal(userPermissions.canUnlock, true);
	assert.equal(userPermissions.canModerate, false);
});

test('Proper DiscussionUserPermissions object is being created from empty set of permissions', function (assert) {
	const userPermissions = DiscussionUserPermissionsModelClass.create(apiStubs.userPermissions.emptySet);

	assert.ok(userPermissions instanceof DiscussionUserPermissionsModelClass);

	assert.equal(userPermissions.canDelete, false);
	assert.equal(userPermissions.canUndelete, false);
	assert.equal(userPermissions.canLock, false);
	assert.equal(userPermissions.canUnlock, false);
	assert.equal(userPermissions.canModerate, false);
});
