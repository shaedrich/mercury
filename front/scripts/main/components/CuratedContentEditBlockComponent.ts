/// <reference path="../app.ts" />
'use strict';
interface CuratedContentEditBlockItemInterface {
	block: string;
	item: CuratedContentEditItemInterface
}

App.CuratedContentEditBlockComponent = Em.Component.extend({
	classNames: ['curated-content-edit-block'],
	tagName: 'section',

	actions: {
		editItem: function (item: CuratedContentEditItemInterface): void {
			var model = this.get('model'),
				block = this.get('block');

			if (block) {
				this.sendAction('editItem', {block: block, item: item});
			} else {
				this.sendAction('editItem', item);
			}
		},

		openSection: function (item: CuratedContentEditItemInterface): void {
			this.sendAction('openSection', item);
		}
	}
});
