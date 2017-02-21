import Ember from 'ember';

const {Mixin, computed} = Ember;

export default Mixin.create({
	unreadCount: computed('notifications.model.data.@each.isUnread', function () {
		const data = this.get('notifications.model.data');

		return data ? data.filterBy('isUnread', true).length : null;
	}),
});
