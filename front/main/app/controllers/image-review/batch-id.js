import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams: ['status', 'order', 'source'],
	status: 'UNREVIEWED',
	order: 'NEWEST',
	source: '',
	actions: {
		reviewAndGetMoreImages() {
			this.get('target').send('reviewAndGetMoreImages');
		},

		changeImageOrder(order) {
			this.get('target').send('changeImageOrder', order);
		},

		changeImageSource(source) {
			this.get('target').send('changeImageSource', source);
		}
	}
});
