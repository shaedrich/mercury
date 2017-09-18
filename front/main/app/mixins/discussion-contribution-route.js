import Ember from 'ember';

/**
 */
export default Ember.Mixin.create({
	actions: {
		generateOpenGraph(uri) {
			const model = this.modelFor(this.get('routeName')).current;

			return model.generateOpenGraph(uri).then((openGraph) => {
				return openGraph;
			});
		},

		willTransition(...args) {
			this._super(...args);
			this.controllerFor(this.get('routeName')).setDefaultStates();
			return true;
		},
	}
});
