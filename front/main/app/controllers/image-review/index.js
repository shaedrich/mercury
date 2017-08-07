import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams: ['status', 'order', 'source'],
	order: 'NEWEST',
	source: ''
});
