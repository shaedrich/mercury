/// <reference path="../app.ts" />
'use strict';

App.CuratedContentEditorSortableItemsMixin = Em.Mixin.create({
	sortableItems: Em.computed('model.items', function (): any {
		return Em.A().pushObjects(this.get('model.items'));
	}),

	actions: {
		moveBy(offset: number, item: CuratedContentEditorItemModel): void {
			var items: Em.NativeArray = this.get('sortableItems'),
				currentItemIndex = items.indexOf(item);

			// Don't move item with index 0 by negative offset and don't move last item by positive offset
			if ((currentItemIndex > 0 && offset < 0) || (currentItemIndex < items.length - 1 && offset > 0)) {
				items.removeAt(currentItemIndex);
				items.insertAt(currentItemIndex + offset, item);
			}
		}
	}
});
