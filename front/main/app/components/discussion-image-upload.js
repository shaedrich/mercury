import Ember from 'ember';

const {isEmpty, A, computed} = Ember;

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
			if (!this.get(`allowedFileTypes.${imageFile.type}`)) {
				this.setErrorMessage(this.get('errorsMessages.fileType'));
				return;
			}

			this.setProperties({
				isLoadingMode: true,
				errorMessage: null,
			});

			this.uploadImage(imageFile)
				.then((result) => {
					this.setProperties({
						isLoadingMode: false,
						isImagePreviewMode: true,
						newImageUrl: result.url,
						uploadedFile: imageFile,
					});
				})
				.then(() => {
					const url = this.get('newImageUrl');
					if (!isEmpty(url)) {
						this.sendAction('addImage', url);
						this.get('contentImages').addContentImage(url);
					}
				})
				.catch((err) => {
					this.set('isLoadingMode', false);
					this.setErrorMessage(this.get('errorsMessages.saveFailed'));
				});
		},

		setErrorMessage(msgKey) {
			this.set('errorMessage', i18n.t(msgKey, {ns: 'discussion'}));
		},

		uploadImage(imageFile) {
			return this.get('staticAssets').saveImage(imageFile);
		},

	});
