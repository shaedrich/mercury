import Ember from 'ember';
import nl2br from 'common/utils/nl2br';
import {truncate, shouldUseTruncationHack} from '../utils/truncate';

/**
 * Handles sending upvote action outside from the component.
 */
export default Ember.Mixin.create({
	autolinkerConfig: {},

	rawContent: Ember.computed('post.rawContent', 'content', function () {
		return this.getParsedRawContent();
	}),
	/**
	 * Returns content with links created from urls and converts \n, \rn and \r to <br>
	 * @returns {string}
	 */
	parsedContent: Ember.computed('post.rawContent', 'post.renderedContent', 'content', function () {
		return this.get('post.renderedContent') ? this.getParsedRenderedContent() : this.getParsedRawContent();
	}),

	getParsedRawContent() {
		let escapedContent = Ember.Handlebars.Utils.escapeExpression(
			this.get('post.rawContent') || this.get('content')
		).trim();

		if (this.get('shouldTruncateContent') && shouldUseTruncationHack()) {
			escapedContent = truncate(escapedContent, 148);
		}

		escapedContent = nl2br(escapedContent);

		return window.Autolinker ? window.Autolinker.link(escapedContent, this.autolinkerConfig) : escapedContent;
	},

	getParsedRenderedContent() {
		let content = this.get('post.renderedContent').trim();

		if (this.get('shouldTruncateContent') && shouldUseTruncationHack()) {
			content = truncate(content, 148);
		}

		return content;
	},

	parseRenderedContent() {

	},

	init() {
		this.autolinkerConfig = {
			email: false,
			phone: false,
			stripPrefix: false,
			twitter: false,
			replaceFn: this.getReplaceFn()
		};

		this._super();
	},

	getReplaceFn() {

		function decodeUriSafely(uri) {
			try {
				return decodeURIComponent(uri);
			} catch (err) {
				return uri;
			}
		}

		/**
		 * Wraps links in span instead of anchor tag in discussion forum view to open post details instead of anchor href.
		 * @param {Autolinker.match.Match} match which should be wrapped
		 * @returns {string}
		 */
		function wrapInSpan(match) {
			if (match.getType() === 'url') {
				return `<span class='url'>${decodeUriSafely(match.getUrl())}</span>`;
			}
			return true;  // Autolinker will perform its normal anchor tag replacement
		}

		/**
		 * Decodes the inner HTML of the link, so that for example Cyrillic script is displayed nicely.
		 * @param {Autolinker.match.Match} match which will be decoded.
		 * @returns {string}
		 */
		function decodeInnerHtml(match) {
			if (match.getType() === 'url') {
				let tag = match.buildTag();

				tag.setInnerHtml(decodeUriSafely(tag.getInnerHtml()));
				return tag;
			}
			return true;  // Autolinker will perform its normal anchor tag replacement
		}

		if (this.get('shouldActivateLinks')) {
			return decodeInnerHtml;
		} else {
			return wrapInSpan;
		}
	},

});
