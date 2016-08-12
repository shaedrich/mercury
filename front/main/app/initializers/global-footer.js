import Ember from 'ember';
import {track, trackActions} from 'common/utils/track';

const {$, getWithDefault} = Ember;

/**
 * @returns {void}
 */
export function initialize() {
	$('.wds-global-footer a').on('mousedown touchstart', function (event) {
		if (event.type === 'touchstart' || event.type === 'mousedown' && event.which === 1) {
			const trackingLabel = this.getAttribute('data-tracking-label');

			if (trackingLabel) {
				track({
					action: trackActions.click,
					category: 'footer',
					label: trackingLabel
				});
			}

			if (this.getAttribute('id') === 'global-footer-full-site-link') {
				const defaultSkin = getWithDefault(Mercury, 'wiki.defaultSkin', 'oasis');

				$.cookie('useskin', defaultSkin, {
					domain: M.prop('cookieDomain'),
					path: '/'
				});
			}
		}
	});
}

export default {
	name: 'global-footer',
	initialize
};
