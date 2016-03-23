import Ember from 'ember';
import TrackClickMixin from '../mixins/track-click';

export default Ember.Mixin.create(
	TrackClickMixin,
	{
		classNameBindings: ['active', 'inGroup', 'last'],
		active: Ember.computed('model', 'activeItem', function () {
			return this.get('model') === this.get('activeItem');
		}),

		inGroup: Ember.computed('model', 'groupItems', function() {
			return this.get('groupItems').contains(this.get('model'));
		}),

		last: Ember.computed('model', 'lastGroupItem', function() {
			return this.get('model') === this.get('lastGroupItem');
		}),

		mouseMove(event) {
			this.get('onMouseEnter')(event.clientX, event.clientY);
		},

		mouseLeave() {
			this.get('onMouseLeave')();
		}
	}
);
