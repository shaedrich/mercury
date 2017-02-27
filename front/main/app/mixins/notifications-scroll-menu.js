import Ember from 'ember';

const {Mixin, on, run, observer} = Ember;

export default Mixin.create({
	classNames: ['notifications-scroll-menu'],
	classNameBindings: ['isLoadingNewResults'],
	scrollableElement: '.scrolling-part',

	bindScrollObserver: on('didRender', function() {
		run.later(() => {
			this.$(this.get('scrollableElement')).on('scroll', this.onScroll.bind(this));
		}, 0);
	}),

	onScrollRemover: on('willDestroyElement', function () {
		this.$(this.get('scrollableElement')).off('scroll', this.onScroll.bind(this));
	}),

	onIsLoading: observer('notifications.isLoading', function () {
		if (this.get('notifications.isLoading') === true) {
			$(this.get('scrollableElement')).animate(
				{scrollTop: $('#zorf').offset().top + 30},
				'slow');
		}
	}),

	onScroll(e) {
		const element = $(e.target);

		if (element[0].scrollHeight === element.outerHeight() + element.scrollTop()) {
			this.onScrolledToTheBottom();
		}
	},

	onScrolledToTheBottom() {
		this.get('notifications').loadMoreResults();
	}
});
