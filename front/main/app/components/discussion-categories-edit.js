import Ember from 'ember';
import {track, trackActions} from '../utils/discussion-tracker';
import DiscussionCategory from '../models/discussion/domain/category';
import ResponsiveMixin from '../mixins/responsive';

export default Ember.Component.extend(ResponsiveMixin,
	{
		classNames: ['highlight-overlay-content', 'discussion-categories-edit'],
		classNameBindings: ['modal.isVisible::highlight-overlay-content'],

		currentUser: Ember.inject.service(),

		canDeleteCategories: Ember.computed.oneWay('currentUser.permissions.discussions.canDeleteCategories'),
		isLoading: false,
		maxCategoriesCount: 10,
		modal: null,
		showSuccess: false,
		wikiId: Ember.get(Mercury, 'wiki.id').toString(),

		init() {
			this._super(...arguments);
			this.set('modal', Ember.Object.create({
				approveButtonDisabled: true,
				approveButtonText: i18n.t('main.categories-delete-category-approve', {ns: 'discussion'}),
				cancelButtonText: i18n.t('main.categories-delete-category-cancel', {ns: 'discussion'}),
				category: null,
				categoryToDelete: null,
				header: i18n.t('main.categories-delete-category-header', {ns: 'discussion'}),
				isVisible: false,
				message: i18n.t('main.categories-delete-category-message', {ns: 'discussion'})
			}));
		},

		addDisabled: Ember.computed('localCategories.length', function () {
			return this.get('localCategories.length') >= this.get('maxCategoriesCount');
		}),

		localCategories: Ember.computed('categories.@each', function () {
			return Ember.A(this.get('categories').map((category) => {
				const localCategory = Ember.Object.create(category);

				localCategory.setProperties({
					displayedName: localCategory.name,
					isDeleted: false
				});

				return localCategory;
			}));
		}),

		errorMessage: null,

		actions: {
			/**
			 * Add new category
			 *
			 * @returns {void}
			 */
			addCategory() {
				if (!this.get('addDisabled')) {
					// Create empty category that user can edit
					this.get('localCategories').pushObject(DiscussionCategory.create({}));

					Ember.run.scheduleOnce('afterRender', this, () => {
						this.$('.discussion-categories-input').last().focus();
					});

					track(trackActions.AddCategoryButtonTapped);
				}
			},

			/**
			 * Delete a category.
			 *
			 * @param {DiscussionCategory} category category to delete
			 */
			deleteCategory(category) {
				if (document.activeElement) {
					document.activeElement.blur();
				}
				this.get('modal').setProperties({
					categoryToDelete: category,
					isVisible: true,
					message: i18n.t('main.categories-delete-category-message', {
						ns: 'discussion',
						categoryName: category.get('name')})
				});
			},

			/**
			 * Delete a local category (category that was not yet saved).
			 *
			 * @param {DiscussionCategory} category local category to delete
			 *
			 * @returns {void}
			 */
			deleteLocalCategory(category) {
				this.get('localCategories').removeObject(category);
			},

			/**
			 * Submit category changes and send them to model
			 *
			 * @returns {void}
			 */
			submit() {
				const localCategories = this.get('localCategories'),
					emptyCategories = localCategories.rejectBy('displayedName');

				this.set('errorMessage', null);
				localCategories.setEach('error', null);

				if (emptyCategories.get('length')) {
					emptyCategories.setEach(
						'error',
						i18n.t('main.categories-edit-error-empty-category', {ns: 'discussion'})
					);
					return;
				}

				this.set('isLoading', true);
				this.get('updateCategories')(localCategories)
					.then(() => {
						this.set('showSuccess', true);

						Ember.run.later(this, () => {
							this.set('showSuccess', false);
							this.sendAction('setEditMode', false);
						}, 2000);
					})
					.catch(() => {
						this.set('errorMessage', i18n.t('main.categories-edit-general-error', {ns: 'discussion'}));
					})
					.finally(() => {
						this.set('isLoading', false);
					});
			},

			/**
			 * Disables categories edit mode
			 *
			 * @returns {void}
			 */
			disableEditMode() {
				this.get('setEditMode')(false);
			},

			/**
			 * Delete category modal approve method.
			 *
			 * @returns {void}
			 */
			onApprove() {
				const category = this.get('modal.category'),
					categoryToDelete = this.get('modal.categoryToDelete');

				if (category && categoryToDelete) {
					categoryToDelete.set('moveTo', category.get('id'));
				}

				this.send('onCancel');
			},

			/**
			 * Delete category modal cancel method.
			 *
			 * @returns {void}
			 */
			onCancel() {
				this.get('modal').setProperties({
					categoryToDelete: null,
					category: null,
					isVisible: false,
					approveButtonDisabled: true
				});
			},

			/**
			 * Selects category to which all threads from category that is going to be deleted should be moved.
			 *
			 * @param {Object} category picked category
			 * @returns {void}
			 */
			onCategoryPicked(category) {
				let modalCategory = category,
					approveButtonDisabled = false;

				if (this.get('modal.category.id') === category.get('id')) {
					modalCategory = null;
					approveButtonDisabled = true;
				}

				this.get('modal').setProperties({
					category: modalCategory,
					approveButtonDisabled
				});
			},

			/**
			 * @param {Ember.Array} oldCategories
			 * @param {Ember.Array} newCategories
			 * @returns {void}
			 */
			onReorderElements(oldCategories, newCategories) {
				this.set('localCategories', newCategories);
			},
		}
	}
);
