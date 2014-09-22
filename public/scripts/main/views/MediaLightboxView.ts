/// <reference path="./LightboxView.ts" />
'use strict';

App.MediaLightboxView = App.LightboxView.extend({
	classNames: ['media-lightbox'],
	templateName: 'app/media-lightbox',

	//opening, open
	//before didInsertElement the lightbox is opening
	status: 'opening',
	videoPlayer: null,

	keyDown: function (event: JQueryEventObject) {
		if (event.keyCode === 39) {
			//handle right arrow
			this.get('controller').incrementProperty('currentGalleryRef')
		} else if (event.keyCode === 37) {
			//handle left arrow
			this.get('controller').decrementProperty('currentGalleryRef')
		}

		this._super(event);
	},

	gestures: {
		swipeLeft: function () {
			this.get('controller').incrementProperty('currentGalleryRef')
		},
		swipeRight: function () {
			this.get('controller').decrementProperty('currentGalleryRef')
		}
	},

	didInsertElement: function () {
		//disabled for now, we can make it better when we have time
		//this.animateMedia(this.get('controller').get('element'));
		this.set('status', 'open');
		this.get('parentView').send('setUnscrollable');

		this._super();
	},

	/**
	* @method currentMediaObserver
	* @description Used to check if media if video after the lightbox current
	* view has been updated. This is so that any specific embed markup is loaded
	* before we try to instantiate player controls.
	*/
	currentMediaObserver: function (): void {
		var currentMedia = this.get('controller.currentMedia');
		if (currentMedia.type === 'video') {
			Em.run.scheduleOnce('afterRender', this, (): void => {
					this.initVideoPlayer(currentMedia);
			});
		}
	}.observes('controller.currentMedia'),

	/**
	* @method initVideoPlayer
	* @description Used to instantiate a provider specific video player
	*/
	initVideoPlayer: function (media: any) {
		var element = this.$('.lightbox-content-inner')[0];
		this.set('videoPlayer', new Wikia.Modules.VideoLoader(element, media.embed));
	},

	animateMedia: function (image?: HTMLElement) {
		if (image) {
			var $image = $(image).find('img'),
				offset = $image.offset(),
				$imageCopy = $image.clone(),
				width = $image.width(),
				deviceWidth = document.body.offsetWidth;

			//initial style, mimic the image that is in page
			$imageCopy.css({
				top: offset.top - window.scrollY + 'px',
				left: offset.left + 'px',
				width: width + 'px'
			//for static css properties see _media_lightbox.scss
			}).addClass('animated-media');

			this.$().append($imageCopy);

			//animate to full width and middle of screen
			$imageCopy.css({
				width: deviceWidth + 'px',
				//half of - device height minus height of the animated image multiplied by scale
				top: ((document.body.offsetHeight - ($image.height() * (deviceWidth / width))) / 2) + 'px',
				left: 0
			}).one('webkitTransitionEnd, transitionend', function () {
				$imageCopy.remove();
			});
		}
	},

	willDestroyElement: function () {
		this.get('parentView').send('setScrollable');
		this.get('controller').reset();

		this._super();
	}
});

