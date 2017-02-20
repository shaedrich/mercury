import Ember from 'ember';

export default Ember.Component.extend({
	classNameBindings: ['overlay:loading-overlay'],

	spinnerClasses: Ember.computed('isBlock', function () {
		return 'spinner ' + (this.get('isBlock') ? 'block' : '');
	}),

	// 'isVisible' is set to false also when 'active' is undefined.
	// This way it is not needed to initialize it in components.
	isVisible: Ember.computed('active', function () {
		return Boolean(this.get('active'));
	}),

	active: false,
	overlay: true,
	isBlock: false,
	radius: 30,
	strokeWidth: 6,

	fullRadius: Ember.computed('radius', function () {
		return this.get('radius') + (this.get('strokeWidth') / 2);
	}),

	fullDiameter: Ember.computed('radius', function () {
		return this.get('radius') * 2 + this.get('strokeWidth');
	}),
});
