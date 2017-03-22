QUnit.module('facets/auth/auth-view');

QUnit.test('getRedirectUrl', function (assert) {
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
			redirect: 'javascript%3Aalert(document.domain)%3B',
			host: 'wikia.com',
			expected: ';',
			description: 'Don\'t allow encoded JavaScript protocol'
		},
		{
			redirect: 'javascript:alert(document.domain);',
			host: 'wikia.com',
			expected: ';',
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

		assert.equal(global.getRedirectUrl(request), testCase.expected, testCase.description);
	});
});
