import Ember from 'ember';

const {Object, A} = Ember,
	DiscussionContentImages = Object.extend({
		images: new A(),

		addContentImage(url) {
			console.log('adding', url);
			this.images.pushObject(Object.create({
				height: 200,
				position: 1,
				url: url,
				visible: true,
				width: 300,
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

	/**
	 * @param {object[]} contentImages
	 * @returns {Ember.Object}
	 */
	create(contentImages) {
		const images = new A(contentImages)
			.sortBy('position')
			.map(data => Object.create({
					id: data.id,
					height: data.height,
					position: data.position,
					url: data.url,
					visible: true,
					width: data.width
				})
			);

		return this._super({images});
	},
});

export default DiscussionContentImages;
