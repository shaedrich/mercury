/// <reference path="../app.ts" />
/// <reference path="../mixins/AlertNotificationsMixin.ts" />
/// <reference path="../mixins/LoadingSpinnerMixin.ts" />
'use strict';

App.CuratedContentEditorComponent = Em.Component.extend(
	App.AlertNotificationsMixin,
	App.LoadingSpinnerMixin,
	App.TrackClickMixin,
{
	classNames: ['curated-content-editor'],

	actions: {
		addBlockItem(block: string): void {
			this.trackClick('curated-content-editor', 'block-add');
			this.sendAction('addBlockItem', block);
		},

		addSection(): void {
			this.trackClick('curated-content-editor', 'section-add');
			this.sendAction('addSection');
		},

		editBlockItem(item: CuratedContentEditorItemModel, block: string): void {
			this.trackClick('curated-content-editor', 'block-edit');
			this.sendAction('editBlockItem', item, block);
		},

		openSection(item: CuratedContentEditorItemModel): void {
			this.trackClick('curated-content-editor', 'section-open');
			this.sendAction('openSection', item);
		},

		save(): void {
			this.trackClick('curated-content-editor', 'save');
			this.validateAndSave();
		}
	},

	validateAndSave(): void {
		this.showLoader();
		App.CuratedContentEditorModel.save(this.get('model'))
			.then((data: CuratedContentValidationResponseInterface): void => {
				if (data.status) {
					//@TODO CONCF-956 add translations
					this.addAlert('info', 'Data saved.');
					this.sendAction('openMainPage');
				} else {
					if (data.error) {
						data.error.forEach((error: any) => this.processValidationError(error.reason));
					} else {
						//@TODO CONCF-956 add translations
						this.addAlert('alert', 'Something went wrong. Please repeat.');
					}
				}
			})
			.catch((err: any): void => {
				//@TODO CONCF-956 add translations
				Em.Logger.error(err);
				this.addAlert('alert', 'Something went wrong. Please repeat.');
			})
			.finally((): void => this.hideLoader());
	},

	processValidationError(reason: string) {
		if (reason === 'itemsMissing') {
			//@TODO CONCF-956 add translations
			this.addAlert('alert', 'Please fix errors inside Explore the Wiki section.');
		} else {
			// if other items occur that means user somehow bypassed validation of one or more items earlier
			//@TODO CONCF-956 add translations
			this.addAlert('alert', 'Please fix errors inside items');
		}
	}
});
