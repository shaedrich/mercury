import Ember from 'ember';
import fetch from 'fetch';
import DiscussionBaseModel from './base';

const DiscussionStaticAssetsModel = DiscussionBaseModel.extend({

	/**
	 * Save attribute in static-assets service
	 * @private
	 * @param {String|Object} data
	 * @returns {Ember.RSVP.Promise}
	 */
	save(data) {
		return fetch(M.getDiscussionServiceUrl(`/${this.wikiId}/images`), {
			body:data,
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers: new Headers({mimeType: 'multipart/form-data'}),
		}).then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				let error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
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
