import Ember from 'ember';
import {trackMarkAsRead} from '../utils/notifications-tracker';

const {Mixin} = Ember;

export default Mixin.create(
	{
		actions: {
			markAsRead(notification) {
				trackMarkAsRead(notification);
				notification.markAsRead();
			}
		}
	}
);

