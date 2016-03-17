import Ember from 'ember';

const firstTagsPattern = /^((\s)*<[^>]*>(\s)*)*/,
	lastTagsPattern = /((\s)*<[^>]*>(\s)*)*$/,
	tagPattern = /(\s)*<[^>]*>(\s)*/g,
	replacementPattern = '(\n|.*)',
	tagMagicWord = 'R_TAG';

export default Ember.Mixin.create({
	selection: null,

	getSelection() {
		const selection = this.get('selection');

		return selection ? selection : window.getSelection();
	},

	setSelection(selection) {
		this.set('selection', selection);
	},

	getHighlightedText() {
		return this.getSelection().toString();
	},

	getHighlightedHtml() {
		const fragment = this.getSelection().getRangeAt(0).cloneContents(),
			div = document.createElement('div');

		div.appendChild(fragment.cloneNode(true));

		return div.innerHTML;
	},

	removeTagsFromBegining(text) {
		return text.replace(firstTagsPattern, '');
	},

	removeTagsFromEnd(text) {
		return text.replace(lastTagsPattern, '');
	},

	trimTags(text) {
		text = this.removeTagsFromBegining(text);
		text = this.removeTagsFromEnd(text);
		return text;
	},

	replaceTags(text) {
		return text.replace(tagPattern, tagMagicWord);
	},

	getHighlightedTextPattern(text) {
		return new RegExp(text.replace(new RegExp(tagMagicWord, 'g'), replacementPattern), 'g');
	},

	getHighlightedTextData(content, text) {
		const pattern = this.getHighlightedTextPattern(text),
			match = pattern.exec(content);

		let data = {};

		if (match) {
			data = {
				text: match[0],
				start: match.index,
				end: match.index + match[0].length
			};
		}

		return data;
	},

	isTextHighlighted() {
		return this.getHighlightedText().length;
	},

	getHighlightedTextSection() {
		let el = this.getSelection().anchorNode,
			sectionIndex = 0;

		/**
		 * We want element node type (ELEMENT_NODE == 1)
		 * If it's different get parent
		 */
		if (el.nodeType !== 1) {
			el = el.parentElement;
		}

		// Get last parent before article wrapper
		while (el && el.parentElement && !el.parentElement.classList.contains('article-content')) {
			el = el.parentElement;
		}
		// Get section header
		while (el && el.nodeName.toLowerCase() !== 'h2') {
			el = el.previousElementSibling;
		}

		// Get section index
		if (el && el.hasAttribute('section')) {
			sectionIndex = el.getAttribute('section');
		}

		return sectionIndex;
	},

	highlightTextInTextarea(textarea, content, highlightedData) {
		const textBeforePosition = content.substr(0, highlightedData.end),
			$textarea = Ember.$(textarea);

		let firstFocus = true;

		this.setTextareaPosition(textarea, $textarea, textBeforePosition, content, highlightedData);

		$textarea.click(() => {
			$textarea.focus();
		});

		$textarea.on('focus', () => {
			if (firstFocus) {
				firstFocus = false;
				this.setTextareaPosition(textarea, $textarea, textBeforePosition, content, highlightedData);
			}
		});

		$textarea.on('focusout', () => {
			firstFocus = false;
		});
	},

	setTextareaPosition(textarea, $textarea, textBeforePosition, content, highlightedData) {
		let top;

		textarea.blur();
		textarea.value = textBeforePosition;
		textarea.focus();
		textarea.value = content;

		top = $textarea.scrollTop();

		if (top > 0) {
			$textarea.scrollTop(top + $textarea.height() - 50);
		}

		textarea.setSelectionRange(highlightedData.start, highlightedData.end);
	}
});