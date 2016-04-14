import Ember from 'ember';
import {test, moduleFor} from 'ember-qunit';
import sinon from 'sinon';

const params = {
		params: {
			'infobox-builder': {
				templateName: 'foo'
			}
		}
	},
	mockWindowTop = {name: 'top'},
	mockWindowSelf = {name: 'iframe'},
	originalWindowTop = window.top,
	originalWindowSelf = window.self;

let setupEnvironmentAndInfoboxDataStub, loadAndSetupInfoboxDataStub;

moduleFor('route:infoboxBuilder', 'Unit | Route | infobox builder', {
	beforeEach() {
		setupEnvironmentAndInfoboxDataStub = sinon.stub().returns(Ember.RSVP.Promise.resolve());
		loadAndSetupInfoboxDataStub = sinon.stub().returns(Ember.RSVP.Promise.resolve());
	},

	afterEach() {
		window.top = originalWindowTop;
		window.self = originalWindowSelf;
	}
});

/**
 * Mock setupEnvironmentAndInfoboxData and loadAndSetupInfoboxData
 * route methods
 *
 * @param {Ember.Route} route
 * @returns {void}
 */
function mockRouteMethods(route) {
	route.setProperties({
		setupEnvironmentAndInfoboxData: setupEnvironmentAndInfoboxDataStub,
		loadAndSetupInfoboxData: loadAndSetupInfoboxDataStub
	});
}

/**
 * Set window top and self properties
 *
 * @param {object} windowTop
 * @param {object} windowSelf
 * @returns {void}
 */
function setWindowProperties(windowTop = mockWindowTop, windowSelf = mockWindowSelf) {
	window.top = windowTop;
	window.self = windowSelf;
}

test('test is it iframe context', function (assert) {
	setWindowProperties();

	const route = this.subject();

	assert.equal(route.get('isIframeContext'), true);
});

test('test is not it iframe context', function (assert) {
	setWindowProperties(window.top, window.top);

	const route = this.subject();

	assert.equal(route.get('isIframeContext'), false);
});

test('test are environment and infobox data set', function (assert) {
	setWindowProperties();

	const route = this.subject();

	mockRouteMethods(route);

	assert.equal(route.get('isEnvironmentSet'), false);

	Ember.run(() => {
		route.beforeModel(params);
	});

	assert.equal(route.get('isIframeContext'), true);
	assert.equal(route.get('isEnvironmentSet'), true);
	assert.equal(setupEnvironmentAndInfoboxDataStub.called, true);
	assert.equal(loadAndSetupInfoboxDataStub.called, false);
});

test('test are evnironment resources not load again', function (assert) {
	setWindowProperties();

	const route = this.subject({
		isEnvironmentSet: true
	});

	mockRouteMethods(route);

	Ember.run(() => {
		route.beforeModel(params);
	});

	assert.equal(route.get('isIframeContext'), true);
	assert.equal(setupEnvironmentAndInfoboxDataStub.called, false);
	assert.equal(loadAndSetupInfoboxDataStub.called, true);
});
