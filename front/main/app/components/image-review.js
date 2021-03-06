import Ember from 'ember';
import ImageReviewItemModel from '../models/image-review/item';

export default Ember.Component.extend({
	classNames: ['image-review'],
	isModalVisible: false,
	thumbnailModel: {},
	newestImages: Ember.computed.equal('order', 'NEWEST'),
	oldestImages: Ember.computed.equal('order', 'OLDEST'),
	isCoppa: false,
	username: '',

	didRender() {
		Ember.$(':focus').blur();
	},

	actions: {
		showModal(popupModel) {
			ImageReviewItemModel.getImageHistory(popupModel.imageId).then((data) => {
				this.set('thumbnailModel.history', data);
			});

			ImageReviewItemModel.getImageInfo(popupModel.imageId).then((data) => {
				this.set('thumbnailModel.fullSizeImageUrl', popupModel.fullSizeImageUrl);
				this.set('thumbnailModel.context', popupModel.context);
				this.set('thumbnailModel.source', popupModel.source);
				this.set('thumbnailModel.originalFilename', data.originalFilename);
				this.set('thumbnailModel.size', data.size);
				this.set('thumbnailModel.dimensions', data.dimensions);
				this.set('thumbnailModel.ownerId', data.ownerId);
				this.set('thumbnailModel.ownerLookupUrl', ImageReviewItemModel.getOwnerLookupUrl(data.ownerId));
				this.set('isModalVisible', true);
			});
		},

		closeModal() {
			this.set('isModalVisible', false);
		}
	}
});
