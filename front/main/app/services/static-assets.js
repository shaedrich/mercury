import Ember from 'ember';
import StaticAssetsModel from '../models/discussion/static-assets';

const {Service, Logger, computed, inject, RSVP} = Ember;

export default Service.extend({
	model: StaticAssetsModel.create(),

	saveImage(imageFile) {
		return this.get('model').saveImage(imageFile);
	}

});
