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
	 * @param hideDeleted
	 * @returns {void}
	 */
	setHideDeleted(hideDeleted) {
		this.set('willHideDeleted', hideDeleted);
	},

	/**
	 * @returns {void}
	 */
	applyHideDeleted(persist) {
		this.set('hideDeleted', this.get('willHideDeleted'));
		if (persist) {
			this.getAllPreferences().then(this.savePreferences.bind(this));
		}
	},

	getAllPreferences() {
		var userId = this.get('currentUser').get('userId');

		return request(M.getUserPreferencesServiceURL(`/${userId}`), {
			method: 'GET'
		}).then((preferences) => {
			return preferences;
		}, (reason) => {
			return {};
		});
	},

	savePreferences(preferences) {
		var userId = this.get('currentUser').get('userId');
		if (!preferences.globalPreferences) {
			preferences.globalPreferences = [];
		}

		for (var i = 0; i < preferences.globalPreferences.length; i++) {
			var preference = preferences.globalPreferences[i];

			if (preference.name == 'hideDeleted') {
				preferences.globalPreferences.splice(i, 1);
			}
		}

		preferences.globalPreferences.push({'name': 'hideDeleted', 'value': `${this.get('hideDeleted')}`});

		request(M.getUserPreferencesServiceURL(`/${userId}`), {
			method: 'PUT',
			data: JSON.stringify(preferences)
		});
	},

	retrieveStoredPreference() {
		var userId = this.get('currentUser').get('userId');

		request(M.getUserPreferencesServiceURL(`/${userId}/global/hideDeleted`), {
			method: 'GET'
		}).then((value) => {
			this.setHideDeleted(value.value == 'true');
			this.applyHideDeleted(false);
		}.bind(this), (reason) => {
			this.setHideDeleted(false);
			this.applyHideDeleted(false);
		}.bind(this));
	}
 });
