QUnit.module('lib/mediawiki-timestamp');

QUnit.test('dateToTimestamp', function (assert) {
	var testCases = [
		{
			date: new Date(2014, 12, 28, 23, 50, 50),
			expected: '20141228235050'
		}
	];

	testCases.forEach(function (testCase) {
		assert.equal(global.dateToTimestamp(testCase.date), testCase.expected);
	});
});
