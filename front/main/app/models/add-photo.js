import Ember from 'ember';
import getEditToken from '../utils/edit-token';
import request from 'ember-ajax/request';
import {form} from '../utils/content-type';

/**
 * @typedef {Object} FileNameSeparated
 * @property {string} name
 * @property {string} extension
 */

const AddPhotoModel = Ember.Object.extend({
	title: null,
	sectionIndex: null,
	photoData: null,
	photoImage: null,
	photoName: null,
	photoExtension: null
});

AddPhotoModel.reopenClass(
	{
		/**
		 * @param {*} photoData
		 * @returns {Ember.RSVP.Promise}
		 */
		load(photoData) {
			return new Ember.RSVP.Promise((resolve, reject) => {
				const oFReader = new FileReader();

				oFReader.readAsDataURL(photoData);
				oFReader.onload = function (oFREvent) {
					const separatedName = AddPhotoModel.separateFileNameAndExtension(photoData.name),
						photoName = separatedName.name,
						photoExtension = separatedName.extension;

					resolve(
						AddPhotoModel.create({
							photoData,
							photoImage: oFREvent.target.result,
							photoName,
							photoExtension
						})
					);
				};
				oFReader.onerror = function () {
					reject();
				};
			});
		},

		/**
		 * @param {*} model
		 * @returns {Ember.RSVP.Promise}
		 */
		upload(model) {
			return this.temporaryUpload(model.photoData)
				.then((addMediaTemporary) => {
					let newPhotoTitle;

					// We already have the file. No need to upload.
					if (typeof addMediaTemporary.tempName === 'undefined') {
						return addMediaTemporary;
					}

					// If a user inputs an empty image name, then we silently replace it with original file name.
					if (model.photoName.trim().length === 0) {
						newPhotoTitle = model.photoData.name;
					} else {
						newPhotoTitle = `${model.photoName.trim()}.${model.photoExtension}`;
					}

					return this.permanentUpload(newPhotoTitle, addMediaTemporary.tempName);
				});
		},

		/**
		 * @param {string} title
		 * @param {string} tempName
		 * @returns {Ember.RSVP.Promise}
		 */
		permanentUpload(title, tempName) {
			return getEditToken(title)
				.then((token) => {
					return request(M.buildUrl({path: '/api.php'}), {
						method: 'POST',
						contentType: form,
						data: {
							action: 'addmediapermanent',
							format: 'json',
							title,
							tempName,
							token
						},
					}).then((response) => {
						if (response && response.addmediapermanent) {
							return response.addmediapermanent;
						} else if (response && response.error) {
							throw new Error(response.error.code);
						} else {
							throw new Error();
						}
					});
				});
		},

		/**
		 * @param {*} photoData
		 * @returns {Ember.RSVP.Promise}
		 */
		temporaryUpload(photoData) {
			return getEditToken(photoData.name)
				.then((token) => {
					const formData = new FormData();

					formData.append('file', photoData);
					formData.append('action', 'addmediatemporary');
					formData.append('format', 'json');
					formData.append('type', 'image');
					formData.append('token', token);

					return request(M.buildUrl({path: '/api.php'}), {
						method: 'POST',
						data: formData,
						cache: false,
						contentType: false,
						processData: false,
					}).then((response) => {
						if (response && response.addmediatemporary) {
							return response.addmediatemporary;
						} else if (response && response.error) {
							throw new Error(response.error.code);
						} else {
							throw new Error();
						}
					});
				});
		},

		/**
		 * @param {string} fileName
		 * @returns {FileNameSeparated}
		 */
		separateFileNameAndExtension(fileName) {
			const name = fileName.substr(0, fileName.lastIndexOf('.')),
				extension = fileName.substr(fileName.lastIndexOf('.') + 1);

			return {
				name,
				extension
			};
		}
	}
);

export default AddPhotoModel;
