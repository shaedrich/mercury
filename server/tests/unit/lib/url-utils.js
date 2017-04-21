QUnit.module('lib/url-utils');

QUnit.test('getHost', function (assert) {
	var testCases = [

		{
			host: 'wikia.com',
			ssl: true,
			expected: 'https://wikia.com',
			description: 'wikia.com with SSL'
		},
		{
			host: 'wikia.com',
			ssl: false,
			expected: 'http://wikia.com',
			description: 'wikia.com without SSL'
		},
		{
			host: 'fallout.wikia.com',
			ssl: false,
			expected: 'http://fallout.wikia.com',
			description: 'fallout.wikia.com without SSL'
		},
		{
			host: 'localhost:8080',
			ssl: true,
			expected: 'https://localhost:8080',
			description: 'localhost:8080 with SSL'
		}
	];

	testCases.forEach(function (testCase) {
		var request = {
			headers: {
				host: testCase.host
			}
		};

		assert.equal(global.getHost(request, testCase.ssl), testCase.expected, testCase.description);
	});
});

QUnit.test('getCanonicalUrl', function (assert) {
	var testCases = [

		{
			path: '/desired-path',
			host: 'wikia.com',
			ssl: true,
			expected: 'https://wikia.com/desired-path',
			description: ''
		},
		{
			path: '/desired-path',
			host: 'wikia.com',
			ssl: false,
			expected: 'http://wikia.com/desired-path',
			description: ''
		}
	];

	testCases.forEach(function (testCase) {
		var request = {
			headers: {
				host: testCase.host
			},
			path: testCase.path
		};

		assert.equal(global.getCanonicalUrl(request, testCase.ssl), testCase.expected, testCase.description);
	});
});

QUnit.test('hasImplicitProtocol', function (assert) {
	var testCases = [
		{
			url: 'http://www.wikia.com',
			expected: false,
			description: 'Regular URLs do not have implicit protocol'
		},
		{
			url: '//wikia.com',
			expected: true,
			description: 'Implicit protocol is detected'
		},
	];

	testCases.forEach(function (testCase) {
		assert.equal(global.hasImplicitProtocol(testCase.url), testCase.expected, testCase.description);
	});
});

QUnit.test('isHttpProtocol', function (assert) {
	var testCases = [
		{
			url: 'http:',
			expected: true,
			description: 'Regular HTTP protocol'
		},
		{
			url: 'https:',
			expected: true,
			description: 'SSL HTTP protocol'
		},
		{
			url: '',
			expected: false,
			description: 'Without a protocol'
		},
		{
			url: undefined,
			expected: false,
			description: 'Undefined a protocol'
		},
		{
			// eslint-disable-next-line no-script-url
			url: 'javascript:',
			expected: false,
			description: 'JavaScript protocol'
		},
	];

	testCases.forEach(function (testCase) {
		assert.equal(global.isHttpProtocol(testCase.url), testCase.expected, testCase.description);
	});
});

QUnit.test('areDomainsMatching', function (assert) {
	var testCases = [
		{
			domain: 'wikia.com',
			currentHost: 'wikia.com',
			expected: true,
			description: 'Equal domain should match.'
		},
		{
			domain: 'fallout.wikia.com',
			currentHost: 'wikia.com',
			expected: true,
			description: 'Fallout subdomain should match wikia.com'
		},
		{
			domain: 'pl.fallout.wikia.com',
			currentHost: 'wikia.com',
			expected: true,
			description: 'Polish Fallout subdomain should match wikia.com'
		},
		{
			domain: 'wikia.com',
			currentHost: 'fallout.wikia.com',
			expected: true,
			description: 'wikia.com should match Fallout subdomain.'
		},
		{
			domain: 'wikia.fake.com',
			currentHost: 'wikia.com',
			expected: false,
			description: 'Fake wikia.fake.com subdomain should not match'
		},
		{
			domain: 'wikia.com',
			currentHost: 'wikia.com.fake.com',
			expected: false,
			description: 'Fake wikia.com subdomain should not match wikia.com.fake.com.'
		},
		{
			domain: 'wikia.com.fake.com',
			currentHost: 'wikia.com',
			expected: false,
			description: 'Fake wikia.com.fake.com subdomain should not match'
		},
		{
			domain: 'fake.com',
			currentHost: 'wikia.com',
			expected: false,
			description: 'Another domain should not match.'
		},
		{
			domain: 'fakewikia.com',
			currentHost: 'wikia.com',
			expected: false,
			description: 'Don\'t allow external domain when wikia.com is the last part of an external domain'
		},
	];

	testCases.forEach(function (testCase) {
		assert.equal(global.areDomainsMatching(testCase.domain, testCase.currentHost),
			testCase.expected,
			testCase.description);
	});
});

QUnit.test('setUrlPathname', function (assert) {
	var testCases = [
		{
			url: 'http://fallout.wikia.com/wiki/Fallout_Wiki',
			pathname: 'signin',
			expected: 'http://fallout.wikia.com/signin',
			description: 'Regular HTTP protocol'
		}
	];

	testCases.forEach(function (testCase) {
		assert.equal(global.setUrlPathname(testCase.url, testCase.pathname), testCase.expected, testCase.description);
	});
});

QUnit.test('setUrlQuery', function (assert) {
	var testCases = [
		{
			url: 'http://fallout.wikia.com/signin',
			query: {redirect: 'http://fallout.wikia.com/piggyback'},
			expected: 'http://fallout.wikia.com/signin?redirect=http%3A%2F%2Ffallout.wikia.com%2Fpiggyback',
			description: 'Query param is escaped'
		},
		{
			url: 'http://muppet.wikia.com/signin?oldParam=I-should-be-gone',
			query: {newParam: 'I-should-stay'},
			expected: 'http://muppet.wikia.com/signin?newParam=I-should-stay',
			description: 'Previous query parameters are removed'
		}
	];

	testCases.forEach(function (testCase) {
		assert.equal(global.setUrlQuery(testCase.url, testCase.query), testCase.expected, testCase.description);
	});
});
