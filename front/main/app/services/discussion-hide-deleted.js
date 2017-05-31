import request from 'ember-ajax/request';

export default Ember.Service.extend({
	willHideDeleted: false,
	hideDeleted: false,
	currentUser: Ember.inject.service(),

	setup: Ember.on('init', function () {
		this.retrieveStoredPreference();
	}),

	/**
	 * @returns {void}
	 */
	toggleHideDeleted() {
		this.setHideDeleted(!this.get('willHideDeleted'));
	},

	/**
	 * @param {boolean} hideDeleted
	 * @returns {void}
	 */
	setHideDeleted(hideDeleted) {
		this.set('willHideDeleted', hideDeleted);
	},

	/**
	 * @param {boolean} persist
	 * @returns {void}
	 */
	applyHideDeleted(persist) {
		this.set('hideDeleted', this.get('willHideDeleted'));
		if (persist) {
			this.getAllPreferences().then(this.savePreferences.bind(this));
		}
	},

	/**
	 * @returns {Ember.RSVP.Promise}
	 */
	getAllPreferences() {
		const userId = this.get('currentUser').get('userId');
		return request(M.getUserPreferencesServiceURL(`/${userId}`), {
			method: 'GET'
		}).then(preferences => preferences, reason => {});
	},

	/**
	 * @param {object} preferences
	 * @returns {void}
	 */
	savePreferences(preferences) {
		const userId = this.get('currentUser').get('userId');
		if (!preferences.globalPreferences) {
			preferences.globalPreferences = [];
		}

		for (let i = 0; i < preferences.globalPreferences.length; i++) {
			const preference = preferences.globalPreferences[i];
			if (preference.name === 'hideDeleted') {
				preferences.globalPreferences.splice(i, 1);
			}
		}

		preferences.globalPreferences.push({name: 'hideDeleted', value: `${this.get('hideDeleted')}`});

		request(M.getUserPreferencesServiceURL(`/${userId}`), {
			method: 'PUT',
			data: JSON.stringify(preferences)
		});
	},

	/**
	 * @returns {void}
	 */
	retrieveStoredPreference() {
		const userId = this.get('currentUser').get('userId');

		request(M.getUserPreferencesServiceURL(`/${userId}/global/hideDeleted`), {
			method: 'GET'
		}).then(preference => {
			this.setHideDeleted(preference.value === 'true');
			this.applyHideDeleted(false);
		}, reason => {
			this.setHideDeleted(false);
			this.applyHideDeleted(false);
		});
	}
 });
