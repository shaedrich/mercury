/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/rsvp/rsvp.d.ts" />

'use strict';

class Globals {
	cachedData: any;

	constructor() {
		this.cachedData = null;
	}

	loadGlobalData() : RSVP.Promise {
		return new RSVP.Promise((resolve, reject) : void => {
			$.get( '/globals', (data) : void => {
				this.cachedData = data;
				resolve(data);
			});
		});
	}

	getLoginUrl() : string {
		return this.cachedData ? this.cachedData.loginUrl : null;
	}

	getSignupUrl() : string {
		return this.cachedData ? this.cachedData.signupUrl : null;
	}

	getMobileBreakpoint() : number {
		return this.cachedData ? this.cachedData.mobileBreakpoint : 710;
	}
}
