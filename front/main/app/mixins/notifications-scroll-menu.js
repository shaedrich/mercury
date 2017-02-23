import Ember from 'ember';

const {Mixin, observer, on, run} = Ember;

export default Mixin.create({
	classNames: ['notifications-scroll-menu'],
	classNameBindings: ['isLoadingNewResults'],
	scrollableElement: '.scrolling-part',

	onNotificationsModelChange: observer('notifications.model.data', function () {
		if (this.get('notifications.model.data.length')) {
			run.later(() => {
				this.$(this.get('scrollableElement')).on('scroll', this.onScroll.bind(this));
			}, 0);
		}
	}),

	onScrollRemover: on('willDestroyElement', function () {
		this.$(this.get('scrollableElement')).off('scroll', this.onScroll.bind(this));
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
