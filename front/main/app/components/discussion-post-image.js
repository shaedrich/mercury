import Ember from 'ember';

const SCALE_WIDTH = 'scale-to-width-down',
	ZOOM_CROP = 'zoom-crop-down',
	{
		Component,
		computed
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
		crop: false,

		/**
		 * @public
		 */
		editorToolsVisible: false,

		/**
		 * @public
		 */
		image: null,

		srcset: computed('crop', 'image', function () {
			const image = this.get('image');

			if (!image.url) {
				return '';
			}

			const sources = this.get('crop') ? this.getCroppedSources(image) : this.getUncroppedSources(image);

			return sources.join(', ');
		}),

		// On desktop image width is limited by column width, on mobile it can take almost 100% of viewport width
		sizes: '(min-width: 1575px) 640px, (min-width: 1064px) 520px, 100vw',

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
		},

		actions: {
			remove() {
				this.sendAction('removeImage', this.get('image'));
			}
		}
	}
);
