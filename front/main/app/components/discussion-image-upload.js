import Ember from 'ember';
import AlertNotificationsMixin from '../mixins/alert-notifications';

const {inject, Component, Logger} = Ember;

export default Component.extend(
	AlertNotificationsMixin,
	{
		classNames: ['discussion-image-upload'],
		staticAssets: inject.service(),

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

			this.get('contentImages')
				.addContentImage(imageFile, this.get('staticAssets'))
				.catch((err) => {
					if (!this.get('isDestroyed')) {
						Logger.error('Error uploading image', err);
						this.showErrorMessage('image-upload.upload-failed');
					}
				})
				.then(() => {
					if (!this.get('isDestroyed')) {
						this.set('resetFileInput', true);
					}
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
	}
	);
