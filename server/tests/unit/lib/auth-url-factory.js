QUnit.module('lib/auth-url-factory');

QUnit.test('getValidRedirectUrl', function (assert) {
	var testCases = [
		{
			redirect: 'http://muppet.wikia.com/wiki/Kermit?action=edit',
			host: 'localhost:8000',
			expected: 'http://muppet.wikia.com/wiki/Kermit?action=edit',
			description: 'Whitelists wikia.com domain'
		},
		{
			redirect: 'http://glee.devbox.wikia-dev.pl/wiki/Rachel_Berry',
			host: 'glee.devbox.wikia-dev.pl',
			expected: 'http://glee.devbox.wikia-dev.pl/wiki/Rachel_Berry',
			description: 'Allow current domain'
		},
		{
			redirect: '/wiki/Kermit',
			host: 'muppet.wikia.com',
			expected: '/wiki/Kermit',
			description: 'Allow local URLs'
		},
		{
			redirect: undefined,
			host: 'glee.devbox.wikia-dev.pl',
			expected: '/',
			description: 'Fallback to / when empty redirect'
		},
		{
			redirect: 'http://www.google.com',
			host: 'glee.wikia.com',
			expected: '/',
			description: 'Fallback to / when domain is not permitted'
		},
		{
			redirect: 'http://www.google.com/?domain=wikia.com',
			host: 'glee.wikia.com',
			expected: '/',
			description: 'Don\'t allow external domain when whitelisted domain is in URL'
		},
		{
			redirect: 'http://www.google.com/?domain=glee.devbox.wikia-dev.pl',
			host: 'glee.devbox.wikia-dev.pl',
			expected: '/',
			description: 'Don\'t allow external domain when current domain is in URL'
		},
		{
			redirect: 'http://www.wikia.com.google.com/',
			host: 'wikia.com',
			expected: '/',
			description: 'Don\'t allow external domain when current wikia.com is put as subdomain'
		},
		{
			redirect: 'http://otherdomainwikia.com',
			host: 'glee.devbox.wikia-dev.pl',
			expected: '/',
			description: 'Don\'t allow external domain when wikia.com is the last part of an external domain'
		},
		{
			redirect: 'http://otherdomainwikia.com',
			host: 'wikia.com',
			expected: '/',
			description: 'Don\'t allow external domain when wikia.com is the last part of an external domain'
		},
		{
			// eslint-disable-next-line no-script-url
			redirect: 'javascript:alert(document.domain);',
			host: 'wikia.com',
			expected: '/',
			description: 'Don\'t allow JavaScript protocol'
		}
	];

	testCases.forEach(function (testCase) {
		var request = {
			query: {
				redirect: testCase.redirect
			},
			headers: {
				host: testCase.host
			}
		};

		assert.equal(global.getValidRedirectUrl(request), testCase.expected, testCase.description);
	});
});


QUnit.test('getValidOriginUrl', function (assert) {
	var testCases = [
		{
			redirect: 'http://muppet.wikia.com/wiki/Kermit?action=edit',
			host: 'localhost:8000',
			expected: 'http://muppet.wikia.com',
			description: 'Whitelists wikia.com domain'
		},
		{
			redirect: 'http://glee.devbox.wikia-dev.pl/wiki/Rachel_Berry',
			host: 'glee.devbox.wikia-dev.pl',
			expected: 'http://glee.devbox.wikia-dev.pl',
			description: 'Allow current domain'
		},
		{
			redirect: '/wiki/Kermit',
			host: 'muppet.wikia.com',
			expected: 'https://muppet.wikia.com',
			description: 'Local URLs use host instead'
		},
		{
			redirect: undefined,
			host: 'glee.devbox.wikia-dev.pl',
			expected: 'https://glee.devbox.wikia-dev.pl',
			description: 'Fallback to / when empty redirect'
		},
		{
			redirect: 'http://www.google.com',
			host: 'glee.wikia.com',
			expected: 'https://glee.wikia.com',
			description: 'Fallback to / when domain is not permitted'
		},
		{
			redirect: 'http://www.google.com/?domain=wikia.com',
			host: 'glee.wikia.com',
			expected: 'https://glee.wikia.com',
			description: 'Don\'t allow external domain when whitelisted domain is in URL'
		},
		{
			redirect: 'http://www.google.com/?domain=glee.devbox.wikia-dev.pl',
			host: 'glee.devbox.wikia-dev.pl',
			expected: 'https://glee.devbox.wikia-dev.pl',
			description: 'Don\'t allow external domain when current domain is in URL'
		},
		{
			redirect: 'http://www.wikia.com.google.com/',
			host: 'wikia.com',
			expected: 'https://wikia.com',
			description: 'Don\'t allow external domain when current wikia.com is put as subdomain'
		},
		{
			redirect: 'http://otherdomainwikia.com',
			host: 'glee.devbox.wikia-dev.pl',
			expected: 'https://glee.devbox.wikia-dev.pl',
			description: 'Don\'t allow external domain when wikia.com is the last part of an external domain'
		},
		{
			redirect: 'http://otherdomainwikia.com',
			host: 'wikia.com',
			expected: 'https://wikia.com',
			description: 'Don\'t allow external domain when wikia.com is the last part of an external domain'
		},
		{
			// eslint-disable-next-line no-script-url
			redirect: 'javascript:alert(document.domain);',
			host: 'wikia.com',
			expected: 'https://wikia.com',
			description: 'Don\'t allow JavaScript protocol'
		}
	];

	testCases.forEach(function (testCase) {
		var request = {
			query: {
				redirect: testCase.redirect
			},
			headers: {
				host: testCase.host
			}
		};

		assert.equal(global.getValidOriginUrl(request), testCase.expected, testCase.description);
	});
});
