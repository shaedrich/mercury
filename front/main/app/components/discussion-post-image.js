import Ember from 'ember';

const SCALE_WIDTH = 'scale-to-width-down',
	ZOOM_CROP = 'zoom-crop-down',
	{
		Component,
		computed,
		String
	} = Ember;

export default Component.extend(
	{
		/**
		 * Important! Adjust these values when breakpoints change.
		 * @private
		 */
		availableThumbSizes: [
			420,
			// Desktop < 1575px
			520,
			// Desktop >= 1575px
			640,
			767,
			1063
		],

		/**
		 * @public
		 */
		shouldCrop: false,

		/**
		 * @public
		 */
		editorToolsVisible: false,

		/**
		 * @public
		 */
		image: null,

		srcset: computed('shouldCrop', 'image', function () {
			const image = this.get('image');

			if (!image || !image.url) {
				return '';
			}

			const sources = this.get('shouldCrop') ? this.getCroppedSources(image) : this.getUncroppedSources(image);

			return sources.join(', ');
		}),

		/**
		 * Desktop image width is limited by column width,
		 * on mobile it can take almost 100% of viewport width
		 * Browsers will pick the best image based on this info
		 */
		sizes: '(min-width: 1575px) 640px, (min-width: 1064px) 520px, 100vw',

		/**
		 * Using 100vw in sizes attribute causes images to be upscaled if too small
		 * Prevent it
		 */
		wrapperStyle: computed('image.width', function () {
			return String.htmlSafe(`max-width: ${this.get('image.width')}px`);
		}),

		actions: {
			remove() {
				this.sendAction('removeImage', this.get('image'));
			}
		},

		getUncroppedSources(image) {
			const sources = [];

			this.get('availableThumbSizes').forEach((width) => {
				if (width <= image.width) {
					sources.push(`${image.url}/${SCALE_WIDTH}/${width} ${width}w`);
				}
			});

			sources.push(`${image.url} ${image.width}w`);

			return sources;
		},

		/**
		 * Crop to 16:9 aspect ratio
		 * @param {Object} image
		 * @returns {Array}
		 */
		getCroppedSources(image) {
			const sources = [];

			this.get('availableThumbSizes').forEach((width) => {
				if (width <= image.width) {
					const height = Math.floor(width * 9 / 16);

					sources.push(`${image.url}/${ZOOM_CROP}/width/${width}/height/${height} ${width}w`);
				}
			});

			const height = Math.floor(image.width * 9 / 16);
			sources.push(`${image.url}/${ZOOM_CROP}/width/${image.width}/height/${height} ${image.width}w`);

			return sources;
		}
	}
);
