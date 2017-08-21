import Ember from 'ember';

export default Ember.Component.extend(
	{
		classNames: ['discussion-image-upload'],
		staticAssets: Ember.inject.service(),

		isImagePreviewMode: false,
		isLoadingMode: false,

		allowedFileTypes: {
			'image/jpeg': true,
			'image/png': true,
			'image/gif': true,
		},

		actions: {
			emptyClickForFileInput() {

			},
			fileUpload(files) {
				const imageFile = files[0];
				this.uploadFile(imageFile);
			},
		},

		uploadFile(imageFile) {
			if (this.get(`allowedFileTypes.${imageFile.type}`)) {
				this.setProperties({
					isLoadingMode: true,
					errorMessage: null,
				});

				this.uploadImage(imageFile)
					.then((event) => {
						console.log(event);
						this.setProperties({
							isLoadingMode: false,
							isImagePreviewMode: true,
							newImageUrl: event.target.result,
							uploadedFile: imageFile,
						});

						track(this.get('trackedActions.EditImagePreview'));
					})
					.then(() => {
					})
					.catch((err) => {
						this.set('isLoadingMode', false);
						this.setErrorMessage(this.get('errorsMessages.saveFailed'));
					});
			} else {
				this.setErrorMessage(this.get('errorsMessages.fileType'));
			}
		},

		setErrorMessage(msgKey) {
			this.set('errorMessage', i18n.t(msgKey, {ns: 'discussion'}));
		},

		uploadImage(imageFile) {
			return this.get('staticAssets').saveImage(imageFile);
		},

	});
