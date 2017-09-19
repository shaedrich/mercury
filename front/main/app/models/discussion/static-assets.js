import fetch from 'fetch';
import DiscussionBaseModel from './base';

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
			headers: new Headers({mimeType: 'multipart/form-data'}),
		})
			.then((response) => {
				return response.json().then((json) => {
					return {response, json}
				})
			})
			.then(({response, json}) => {
				if (response.ok) {
					return json;
				}

				let error = new Error(response.statusText);
				error.response = json;
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
