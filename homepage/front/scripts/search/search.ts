/// <reference path="../../../../typings/jquery/jquery.d.ts" />

'use strict';

function processArguments() : any {
	var params : any = {},
		parts : Array<string>;

	if (location.search) {
		parts = location.search.substring(1).split('&');

		for (var i = 0; i < parts.length; i++) {
			var nv = parts[i].split('=');
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

	if ($(document).width() < 710) {
		$('#searchWikiaTextMobile').val(decodeURIComponent(params.q) || '');
	} else {
		$('#searchWikiaText').val(decodeURIComponent(params.q) || '');
	}
}

(function() : void {
	// Google custom search injection
	// https://developers.google.com/custom-search/docs/tutorial/implementingsearchbox
	var cx : string = '005745855109319432328:coaj7jf_wgs',
		gcse : HTMLScriptElement = document.createElement('script'),
		s : HTMLScriptElement;

	gcse.type = 'text/javascript';
	gcse.async = true;
	gcse.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') +
		'//www.google.com/cse/cse.js?cx=' + cx;

	s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(gcse, s);

	fillSearchTextBox();
})();


