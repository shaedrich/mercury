import Ember from 'ember';

const {Mixin, on, run} = Ember;

export default Mixin.create({
	classNames: ['notifications-scroll-menu'],
	classNameBindings: ['isLoadingNewResults'],
	scrollableElement: '.scrolling-part',
	almostBottom: 70,

	bindScrollObserver: on('didRender', function() {
		run.later(() => {
			this.$(this.get('scrollableElement')).on('scroll', this.onScroll.bind(this));
		}, 0);
	}),

	onScrollRemover: on('willDestroyElement', function () {
		this.$(this.get('scrollableElement')).off('scroll', this.onScroll.bind(this));
	}),

	onScroll(e) {
		if (this.hasScrolledToTheBottom($(e.target))) {
			this.onScrolledToTheBottom();
		}
	},

	/**
	 * Has the user scrolled almost to the bottom?
	 * @private
	 */
	hasScrolledToTheBottom(element) {
		return element[0].scrollHeight - this.get('almostBottom') <= element.scrollTop() + element.innerHeight();
	},

	onScrolledToTheBottom() {
		this.get('notifications').loadMoreResults();
	}
});
