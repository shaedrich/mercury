import Ember from 'ember';

const {inject, Component, Logger} = Ember;

export default Component.extend(
	{
		classNames: ['discussion-image-upload'],
		staticAssets: inject.service(),

		isDragActive: false,

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
			onImageSelected(files) {
				this.handleImageSelected(files[0]);
			},
		},

		handle400Response(response) {
			// TODO this should be refactored to use Problem's type, when it becomes available
			Logger.error('Handling 400 response', response);
			if (response && response.title === 'Max image size exceeded') {
				this.showErrorMessage('image-upload.max-size-exceeded');
			} else {
				this.showErrorMessage('image-upload.invalid-image');
			}
		},

		handleImageSelected(imageFile) {
			if (this.get('allowedFileTypes').indexOf(imageFile.type) === -1) {
				this.showErrorMessage('image-upload.invalid-file-type');
				return;
			}

			this.get('contentImages')
				.addContentImage(imageFile, this.get('staticAssets'))
				.catch((err) => {
					Logger.error('Error uploading image', err);

					if (err.status === 400) {
						this.handle400Response(err.response);
					} else {
						this.showErrorMessage('image-upload.upload-failed');
					}
				});
		},

		showErrorMessage(msgKey) {
			this.sendAction('showError', msgKey);
		},

		getErrorMessage(msgKey) {
			return i18n.t(msgKey, {ns: 'discussion'});
		},
	}
);
