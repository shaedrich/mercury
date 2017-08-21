import Ember from 'ember';
import request from 'ember-ajax/request';
import DiscussionBaseModel from './base';
import DiscussionSiteAttributes from './domain/site-attributes';

const DiscussionStaticAssetsModel = DiscussionBaseModel.extend({
	data: null,

	/**
	 * Save attribute in static-assets service
	 * @private
	 * @param {String|Object} data
	 * @returns {Ember.RSVP.Promise}
	 */
	save(data) {
		return request(M.getDiscussionServiceUrl(`/${this.wikiId}/images`), {
			data,
			method: 'POST',
			processData: false,
			contentType: false,
			mimeType: 'multipart/form-data',
		}).then((data) => {
			console.log("result", data);
			this.set(`data.${data.name}.value`, data.value);

			return this.get(`data.${data.name}`);
		});
	},

	/**
	 * @param {Object} imageFile
	 * @returns {Ember.RSVP.Promise}
	 */
	saveImage(imageFile) {
		const data = new FormData();

		data.append('data', imageFile);
		data.append('context', 'discussions');

		return this.save(data);
	},

});


export default DiscussionStaticAssetsModel;
