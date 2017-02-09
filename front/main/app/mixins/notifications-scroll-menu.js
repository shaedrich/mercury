import Ember from 'ember';

const {Mixin, computed, inject, observer, on, run} = Ember;

export default Mixin.create({
	classNames: ['notifications-scroll-menu'],
	classNameBindings: ['isLoadingNewResults'],
	scrollableElement: '.notifications-list',

	onScrollBinder: observer('notifications.model.data', function () {
		if (this.get('notifications.model.data.length')) {
			run.later(() => {
				this.$(this.get('scrollableElement')).on('scroll', this.onScroll.bind(this));
			}, 0);
		}
	}),

	onScrollRemover: on('didInsertElement', function () {
		this.$(this.get('scrollableElement')).off('scroll', this.onScroll.bind(this));
	}),

	onScroll(e) {
		const element = $(e.target);

		// 99 is a height of the space for loading spinner
		if (element[0].scrollHeight  == element.outerHeight() + element.scrollTop() + 50) {
			this.onScrolledToTheBottom();
		}
	},

	onScrolledToTheBottom() {
		throw new Error('Did not overload an infinite scroll mixin onScrolledToTheBottom method');
	},

	onScrolledToTheBottom() {
		const $scrollableElement = this.$(this.get('scrollableElement'))[0];

		this.get('notifications').loadMoreResults();
		this.set('isLoadingNewResults', true);
		$scrollableElement.scrollTop(scrollableElement[0].scrollHeight);
	}
});
