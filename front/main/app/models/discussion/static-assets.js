import fetch from 'fetch';
import DiscussionBaseModel from './base';

const {Logger} = Ember;

const DiscussionStaticAssetsModel = DiscussionBaseModel.extend({

	/**
	 * Save attribute in static-assets service
	 * @private
	 * @param {String|Object} data
	 * @returns {Promise}
	 */
	save(data) {
		return fetch(M.getDiscussionServiceUrl(`/${this.wikiId}/images`), {
			body: data,
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				return this.deserializeErrorResponse(response);
			});
	},

	/**
	 * @private
	 * @param response
	 * @returns {Promise.<T>}
	 */
	deserializeErrorResponse(response) {
		let error = new Error(response.statusText);
		error.status = response.status;

		return response.json()
			.then(json => {
				Logger.info('Deserialized error response', response, json);
				error.response = json;
				throw error;
			})
			.catch(err => {
				Logger.warn('Failed to deserialize JSON', response, err);
				throw error;
			});
	},

	/**
	 * @param {Object} imageFile
	 * @returns {Promise}
	 */
	saveImage(imageFile) {
		const data = new FormData();

		data.append('data', imageFile);
		data.append('context', 'discussions');

		return this.save(data);
	},

});


export default DiscussionStaticAssetsModel;
