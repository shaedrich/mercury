import Ember from 'ember';
import {track, trackActions} from '../utils/discussion-tracker';
import {getLastUrlFromText} from 'common/utils/string';

const {
	Mixin,
	computed,
	get,
	observer,
	run
} = Ember;

export default Mixin.create({
	isOpenGraphLoading: false,
	openGraph: null,
	contentLength: 0,

	showOpenGraphCard: computed('openGraph', 'contentImages.images.@each', function () {
		const contentImages = this.get('contentImages');

		if (contentImages && contentImages.hasImages()) {
			return false;
		}

		return this.get('isOpenGraphLoading') || Boolean(this.get('openGraph'));
	}),

	/**
	 * Track content changed
	 *
	 * @returns {void}
	 */
	onContentChange: observer('content', function () {
		this.handleTyping();

		const length = this.getWithDefault('content.length', 0);
		this.set('contentLength', length);
	}),

	didInsertElement() {
		this._super(...arguments);

		this.$().find('textarea:last')
			.on('paste', this.onPaste.bind(this));
	},

	/**
	 * In some browsers (IE11) there's no support for event clipboard data, so there's a need to
	 * wait and then check the content of the textarea
	 *
	 * @param {Event} event
	 *
	 * @returns {void}
	 */
	onPaste(event) {
		const clipboardData = get(event, 'originalEvent.clipboardData'),
			textType = 'text/plain';

		let pastedText;

		if (clipboardData && clipboardData.getData &&
			Array.prototype.slice.call(clipboardData.types).indexOf(textType) !== -1) {
			pastedText = clipboardData.getData(textType);
		}

		if (typeof pastedText === 'string' && pastedText.length) {
			const pastedUrl = getLastUrlFromText(pastedText);

			if (pastedUrl) {
				this.setOpenGraphProperties(pastedUrl);
			}
		} else {
			run.later(() => {
				const textarea = event.target,
					pastedUrl = getLastUrlFromText(
						textarea.value.substring(0, textarea.selectionEnd)
					);

				if (pastedUrl) {
					this.setOpenGraphProperties(pastedUrl);
				}
			}, 100);
		}
	},

	/**
	 * Generates OG card if there's a url to generate it for
	 *
	 * @returns {void}
	 */
	handleTyping() {
		const textarea = this.$('textarea:last').get(0);

		if (!textarea) {
			return;
		}

		const value = this.get('content');
		if (value === null) {
			return;
		}

		const lastChar = value.charCodeAt(textarea.selectionEnd - 1),
			allowedChars = [10, 13, 32];

		if (allowedChars.indexOf(lastChar) === -1 || value.length <= this.get('contentLength')) {
			return;
		}

		const url = getLastUrlFromText(value.substring(0, textarea.selectionEnd));

		// start with position of caret - url length - 1 for newly typed charatcter
		if (url && value.indexOf(url) === textarea.selectionEnd - url.length - 1) {
			this.setOpenGraphProperties(url);
		}
	},

	setOpenGraphProperties(url) {
		if (
			this.get('openGraph') ||
			this.get('contentImages').hasImages()
		) {
			return;
		}

		this.set('isOpenGraphLoading', true);

		this.get('generateOpenGraph')(url)
			.then((openGraph) => {
				this.setProperties({
					openGraph,
					isOpenGraphLoading: false
				});

				track(trackActions.OGCreated);
			}).catch(() => {
				this.setProperties({
					openGraph: null,
					isOpenGraphLoading: false
				});
			});
	},

	afterSuccess() {
		this._super();
		this.set('openGraph', null);
	},

	actions: {
		/**
		 * Hides open graph card and removes it's data from the editor
		 *
		 * @returns {void}
		 */
		removeOpenGraph() {
			this.set('openGraph', null);
			track(trackActions.OGRemoved);
		}
	}
});
