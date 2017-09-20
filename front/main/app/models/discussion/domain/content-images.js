import Ember from 'ember';

const {Object, A} = Ember,
	DiscussionContentImages = Object.extend({
		images: null,

		init(images) {
			this._super(...arguments);
			if (images) {
				this.set('images', images);
			} else {
				this.set('images', new A());
			}
		},

		hasImages() {
			return this.get('images.length');
		},

		setImages(images) {
			this.get('images').setObjects(images);
		},

		addContentImage(image) {
			const images = this.get('images');
			const position = images.filterBy('visible')
				.reduce((previous, item) => Math.max(previous, item.position), 0);
			images.pushObject(Object.create({
				height: image.height,
				position: position + 1,
				url: image.url,
				visible: true,
				width: image.width,
			}));
		},

		/**
		 * Converts to API representation
		 * @returns object[]
		 */
		toData() {
			return this.get('images')
				.filterBy('visible')
				.map(image => {
					return {
						height: image.height,
						position: image.position,
						url: image.url,
						width: image.width
					};
				});
		}

	});

DiscussionContentImages.reopenClass({

	toImages(contentImages) {
		return new A(contentImages)
			.sortBy('position')
			.map(data => Object.create({
				id: data.id,
				height: data.height,
				position: data.position,
				url: data.url,
				visible: true,
				width: data.width
			}));
	},

	/**
	 * @param {object[]} contentImages
	 * @returns {Ember.Object}
	 */
	create(contentImages) {
		return new DiscussionContentImages(DiscussionContentImages.toImages(contentImages));
	},
});

export default DiscussionContentImages;
