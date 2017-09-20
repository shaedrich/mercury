import Ember from 'ember';
import AlertNotificationsMixin from '../mixins/alert-notifications';

const {isEmpty, inject, Component, Logger} = Ember;

export default Component.extend(
	AlertNotificationsMixin,
	{
		classNames: ['discussion-image-upload'],
		staticAssets: inject.service(),

		isLoadingMode: false,
		isDragActive: false,
		resetFileInput: false,

		allowedFileTypes: [
			'image/jpeg',
			'image/png',
			'image/gif'
		],

		dragLeave(event) {
			event.preventDefault();
			this.set('isDragActive', false);
		},

		dragOver(event) {
			event.preventDefault();
			this.set('isDragActive', true);
		},

		drop(event) {
			event.preventDefault();
			this.send('onImageSelected', event.dataTransfer.files);
			this.set('isDragActive', false);
		},

		actions: {
			/**
			 * Empty method for the file-input helper required click method.
			 * @return {void}
			 */
			emptyClickForFileInput() {
			},
			onImageSelected(files) {
				this.handleImageSelected(files[0]);
			},
		},

		handleImageSelected(imageFile) {
			if (this.get('allowedFileTypes').indexOf(imageFile.type) === -1) {
				this.showErrorMessage('image-upload.invalid-file-type');
				return;
			}

			this.set('isLoadingMode', true);

			this.uploadImage(imageFile)
				.then((result) => {
					if (!isEmpty(result)) {
						this.get('contentImages').addContentImage(result);
					}
				})
				.catch((err) => {
					Logger.error('Error uploading image', err);
					this.showErrorMessage('image-upload.upload-failed');
				})
				.then(() => {
					this.set('resetFileInput', true);
					this.set('isLoadingMode', false);
				});
		},

		showErrorMessage(msgKey) {
			this.addAlert({
				message: this.getErrorMessage(msgKey),
				type: 'alert'
			});
		},

		getErrorMessage(msgKey) {
			return i18n.t(msgKey, {ns: 'discussion'});
		},

		uploadImage(imageFile) {
			return this.get('staticAssets').saveImage(imageFile);
		},

	});
