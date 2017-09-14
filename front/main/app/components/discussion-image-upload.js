import Ember from 'ember';
import AlertNotificationsMixin from '../mixins/alert-notifications';

const {isEmpty, Logger} = Ember;

export default Ember.Component.extend(
	AlertNotificationsMixin,
	{
		classNames: ['discussion-image-upload'],
		staticAssets: Ember.inject.service(),

		isLoadingMode: false,
		isDragActive: false,
		resetFileInput: false,

		allowedFileTypes: {
			'image/jpeg': true,
			'image/png': true,
			'image/gif': true,
		},

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
			this.send('fileUpload', event.dataTransfer.files);
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
			if (!this.get(`allowedFileTypes.${imageFile.type}`)) {
				this.showErrorMessage('image-upload.invalid-file-type');
				return;
			}

			this.set('isLoadingMode', true);

			this.uploadImage(imageFile)
				.then((result) => {
					this.setProperties({
						newImageUrl: result.url,
						uploadedFile: imageFile,
					});
				})
				.then(() => {
					const url = this.get('newImageUrl');
					if (!isEmpty(url)) {
						this.get('contentImages').addContentImage(url);
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
