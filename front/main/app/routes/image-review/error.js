import Ember from 'ember';

const {Route} = Ember;

export default Route.extend({
	afterModel() {
		this.controllerFor('application').set('fullPage', true);
	},
});