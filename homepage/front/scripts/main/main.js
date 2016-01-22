import * as globals from './globals';
import {loadSearch} from './search';

/**
 * Perform search
 * @returns {void}
 */
function search(isTopNav = true) {
	let searchText = encodeURI($('#searchWikiaText').val()),
		searchUrl;

	if (isTopNav) {
		searchText = encodeURI($('#searchWikiaText').val());

		if (!searchText) {
			// search button for mobile is different element
			searchText = encodeURI($('#searchWikiaTextMobile').val());
		}
	} else {
		searchText = encodeURI($('#wiwSearchWikiaTextDesktop').val());

		if (!searchText) {
			// search button for mobile is different element
			searchText = encodeURI($('#wiwSarchWikiaTextMobile').val());
		}
	}

	if (searchText) {
		if (window.optimizely.variationMap[globals.getOptimizelyId()] === 1) {
			// Use Google search
			if (window.location.pathname === '/') {
				searchUrl = `search?q=${searchText}`;
			} else {
				searchUrl = `/search?q=${searchText}`;
			}
		} else {
			// Use Oasis search
			searchUrl = `http://ja.wikia.com/Special:Search?search=${searchText}&fulltext=Search&resultsLang=ja`;
		}

		window.location.href = searchUrl;
	}
}

$(() => {
	const headings = $('.grid-heading');

	$('.hero-carousel').slick({
		arrows: false,
		dots: true,
		autoplay: true,
		autoplaySpeed: 3000,
		slidesToShow: 1,
		responsive: [
			{
				breakpoint: 1000,
				settings: {
					dots: false
				}
			}
		]
	});

	$('.hero-carousel-mobile').slick({
		arrows: false,
		dots: true,
		autoplay: true,
		autoplaySpeed: 3000,
		slidesToShow: 1,
	});

	// Move previous/next arrow elements inside hero-carousel.
	// This must be done after initializing slick, otherwise the buttons will
	// be treated as slides
	$('#hero-prev').detach().appendTo('#hero-carousel');
	$('#hero-next').detach().appendTo('#hero-carousel');
	$('#hero-prev-mobile').detach().appendTo('#hero-carousel-mobile');
	$('#hero-next-mobile').detach().appendTo('#hero-carousel-mobile');

	$('.featured-carousel').slick({
		arrows: false,
		dots: false,
		slidesToShow: 4,
		slidesToScroll: 4,
		responsive: [
			{
				breakpoint: 1140,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				}
			},
			{
				breakpoint: 865,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 615,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	// TODO: The number of carousels should be encoded in a json file
	for (let i = 1; i <= 3; i++) {
		$(`#carousel-${i}-prev`).detach().appendTo(`#carousel-${i}`);
		$(`#carousel-${i}-next`).detach().appendTo(`#carousel-${i}`);
	}

	// Dynamically adjust text size to show community title without text break.
	// bigText adjusts the size programatically and strips off css padding, so it is
	// necessary to add it in explicitly afterwards
	headings.bigText({maximumFontSize: 20, verticalAlign: 'top'});
	headings.css({padding: '.1rem'});

	globals.loadGlobalData().then((data) => {
		loadSearch(data.mobileBreakpoint);
	});
});

$('#beginnersGuide').click((event) => {
	window.location.href = '/beginners';
	event.preventDefault();
});

$('.search-wikia-form').submit((event) => {
	search();
	event.preventDefault();
});

$('.search-wikia').click((event) => {
	search();
	event.preventDefault();
});

$('.jw-community-link').click(() => {
	window.location.href = globals.getJaCommunityUrl();
});

$('.jw-university-link').click(() => {
	window.location.href = globals.getJaUniversityUrl();
});

$('.wiw-search-wikia-form').submit((event) => {
	search(false);
	event.preventDefault();
});

$('.wiw-search-wikia-button').click((event) => {
	search(false);
	event.preventDefault();
});

$('.wiw-start-wikia').click(() => {
	window.location.href = globals.getStartWikiaUrl();
});

$('.hero-prev').click(function () {
	const id = $(this).attr('id'),
		carousel = $(`#${id}`).parent().attr('id');

	$(`#${carousel}`).slick('slickPrev');
});

$('.hero-next').click(function () {
	const id = $(this).attr('id'),
		carousel = $(`#${id}`).parent().attr('id');

	$(`#${carousel}`).slick('slickNext');
});

$('#loginIcon').click((event) => {
	if ($(document).width() < globals.getMobileBreakpoint()) {
		$('#userInfoToggle').toggle();
	} else {
		window.location.href = globals.getLoginUrl();
	}

	event.preventDefault();
});

$('#whatIsWikia').click((event) => {
	window.location.href = '/beginners';
	event.preventDefault();
});
