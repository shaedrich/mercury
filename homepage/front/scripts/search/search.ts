/// <reference path="../../../../typings/jquery/jquery.d.ts" />

'use strict';

declare var getGlobals : any;

(function() : void {
	var mobileBreakpoint : number = getGlobals().mobileBreakpoint;

	function processArguments() : any {
		var params : any = {},
			parts : Array<string>,
			i,
			nv;

		if (location.search) {
			parts = location.search.substring(1).split('&');

			for (i = 0; i < parts.length; i++) {
				nv = parts[i].split('=');
				if (!nv[0]) {
					continue;
				}
				params[nv[0]] = nv[1] || true;
			}
		}

		return params;
	}

	function fillSearchTextBox() : void {
		var params : any = processArguments();

		if (params.hasOwnProperty('q')) {
			if ($(document).width() < mobileBreakpoint) {
				$('#searchWikiaTextMobile').val(decodeURIComponent(params.q));
			} else {
				$('#searchWikiaText').val(decodeURIComponent(params.q));
			}
		}
	}

	function loadSearch() : void {
		// Google custom search injection
		// https://developers.google.com/custom-search/docs/tutorial/implementingsearchbox
		// TODO: Consider keeping searchKey in separate config file as it is currently shared with Mercury
		var searchKey : string = '006230450596576500385:kcgbfm7zpa8',
			googleCustomSearch : HTMLScriptElement = document.createElement('script'),
			s : HTMLScriptElement;

		googleCustomSearch.type = 'text/javascript';
		googleCustomSearch.async = true;
		googleCustomSearch.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') +
			'//www.google.com/cse/cse.js?cx=' + searchKey;

		s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(googleCustomSearch, s);

		fillSearchTextBox();
	}

	loadSearch();
})();

