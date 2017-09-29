import Ember from 'ember';
import StaticAssetsModel from '../models/discussion/static-assets';

const {Service} = Ember;

export default Service.extend({
	model: StaticAssetsModel.create(),

	saveImage(imageFile) {
		return this.get('model').saveImage(imageFile);
	}

});
