import Ember from 'ember';
import DiscussionWrapperComponentMixin from '../mixins/discussion-wrapper-component';
import ResponsiveMixin from '../mixins/responsive';

export default Ember.Component.extend(
	DiscussionWrapperComponentMixin,
	ResponsiveMixin,
	{
		pages: Ember.computed('posts.[]', function () {
			var pages = [];
			for(let i = 0; i < this.get('posts').length; i+=20) {
				pages.push(this.get('posts').slice(i, i+20));
			}
			return pages;
		}),

		init() {
			this._super(...arguments);
			// setTimeout(() => { this.get('pages'); }, 3000);
		}
	}
);
