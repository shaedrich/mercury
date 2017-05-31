import sinon from 'sinon';
import hbs from 'htmlbars-inline-precompile';
import {test, moduleForComponent} from 'ember-qunit';

const toggleSelector = '.wds-dropdown__toggle',
	contentSelector = '.wds-dropdown__content',
	toggleSvgPattern = '<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron">.*<\/svg>';

moduleForComponent('design-system.wds-dropdown', 'Integration | Component | wds-dropdown', {
	integration: true,

	beforeEach() {
		this.set('action', sinon.spy());
	}
});

test('yields toggle and content', function (assert) {
	this.render(hbs`
		{{#design-system.wds-dropdown as |dropdown|}}
			{{#dropdown.toggle}}Toggle{{/dropdown.toggle}}
			{{#dropdown.content}}Content{{/dropdown.content}}
		{{/design-system.wds-dropdown}}
	`);

	assert.ok(
		new RegExp(`Toggle\n${toggleSvgPattern}`).test(
			this.$(toggleSelector).html().trim()
		),
		'Toggle is rendered'
	);
	assert.equal(this.$(contentSelector).html().trim(), 'Content', 'Content is rendered');
});

test('handles additional attributes', function (assert) {
	this.render(hbs`
		{{#design-system.wds-dropdown  as |dropdown|}}
			{{#dropdown.toggle title="Title"}}Toggle{{/dropdown.toggle}}
			{{#dropdown.content dropdownRightAligned=true}}Content{{/dropdown.content}}
		{{/design-system.wds-dropdown}}
	`);

	assert.equal(this.$(toggleSelector).prop('title'), 'Title', 'Toggle has title attribute');
	assert.ok(this.$(contentSelector).hasClass('wds-is-right-aligned'), 'Content', 'Content is right aligned');
});
