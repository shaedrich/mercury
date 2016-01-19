/// <reference path="../../../../typings/jquery/jquery.d.ts" />
/// <reference path="../main/globals.ts" />

'use strict';

(function() : void {
	var globals : Globals = new Globals(),
		mobileBreakpoint : number;

	function processArguments() : any {
		var params : any = {},
			argParts : Array<string>,
			argValues : Array<string>,
			i : number;

			if (location.search) {
			argParts = location.search.substring(1).split('&');

			for (i = 0; i < argParts.length; i++) {
				argValues = argParts[i].split('=');
				if (!argValues[0]) {
					continue;
				}
				params[argValues[0]] = argValues[1] || true;
			}
		}

		return params;
	}

	function fillSearchTextBox(params) : void {
		if (params.hasOwnProperty('q')) {
			if ($(document).width() < mobileBreakpoint) {
				$('#searchWikiaTextMobile').val(decodeURIComponent(params.q));
			} else {
				$('#searchWikiaText').val(decodeURIComponent(params.q));
			}
		}
	}

	function loadSearch() : void {
		globals.loadGlobalData().then((data: any) => {
			mobileBreakpoint = globals.getMobileBreakpoint();

			// Google custom search injection
			// https://developers.google.com/custom-search/docs/tutorial/implementingsearchbox
			// TODO: Consider keeping searchKey in separate config file as it is currently shared with Mercury
			var searchKey : string = '006230450596576500385:kcgbfm7zpa8',
				url : string = (document.location.protocol === 'https:' ? 'https:' : 'http:') +
					'//www.google.com/cse/cse.js?cx=' + searchKey,
				params : any = processArguments();

			ga('send', 'pageview', `${window.location.pathname}?q=${params.q}&qInter=${params.q}`);
			$.getScript(url);
			fillSearchTextBox(params);
		});
	}

	loadSearch();
})();
