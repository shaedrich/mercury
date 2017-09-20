import Ember from 'ember';
import {trackActions} from '../utils/discussion-tracker';

import DiscussionEditorOpengraph from '../mixins/discussion-editor-opengraph';
import DiscussionMultipleInputsEditor from './discussion-multiple-inputs-editor';
import DiscussionEditorCategoryPicker from '../mixins/discussion-editor-category-picker';
import DiscussionEditorConfiguration from '../mixins/discussion-editor-configuration';
import DiscussionContentImages from '../models/discussion/domain/content-images';

const {computed, get, inject} = Ember;

export default DiscussionMultipleInputsEditor.extend(
	DiscussionEditorOpengraph,
	DiscussionEditorConfiguration,
	DiscussionEditorCategoryPicker,
	{
		attributeBindings: ['style'],
		categoryTrackingAction: trackActions.PostCategoryAdded,
		classNames: ['discussion-inline-editor'],
		classNameBindings: ['isSticky', 'isActive'],
		tagName: 'form',

		currentUser: inject.service(),

		isActive: false,
		isSticky: false,

		layoutName: 'components/discussion-inline-editor',

		init() {
			this._super(...arguments);
			if (!this.get('isEdit')) {
				this.set('contentImages', new DiscussionContentImages());
			}
		},

		afterSuccess() {
			this._super();
			this.set('contentImages', new DiscussionContentImages());
		},

		isPostEditor: computed('isReply', function () {
			return !this.get('isReply');
		}),

		isReadonly: computed('isActive', function () {
			return !this.get('isActive') ? 'readonly' : undefined;
		}),

		showImageUpload: computed('contentImages.images.[]', 'isActive', function () {
			return get(Mercury, 'wiki.enableDiscussionsImageUpload') &&
				!this.get('contentImages').hasImages() &&
				this.get('isActive');
		}),

		/**
		 * Returns true if textarea is the only textarea in editor and should appear as first/only one in
		 * collapsed inline editor.
		 * @returns {boolean}
		 */
		showTextareaAsFirstIfAlone: computed('isActive', 'isReply', function () {
			return this.get('isReply') || this.get('isActive');
		}),

		click(event) {
			this.sendAction('setEditorActive', 'contributeEditor', true);
			this.focusOnNearestTextarea(event);
		},

		actions: {
			submit() {
				if (!this.get('submitDisabled')) {
					const newDiscussionEntityData = {
						body: this.get('content'),
						creatorId: this.get('currentUser.userId'),
						siteId: Mercury.wiki.id,
						title: this.get('title'),
						contentImages: this.get('contentImages').toData(),
					};
					if (this.get('showsOpenGraphCard')) {
						newDiscussionEntityData.openGraph = this.get('openGraph');
					}

					this.get('create')(newDiscussionEntityData, {newCategoryId: this.get('category.id')});
				}
			},

			setEditorActive(editorType, active) {
				this.sendAction('setEditorActive', editorType, active);
			}
		}
	}
);
