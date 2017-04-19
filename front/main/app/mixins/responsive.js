import Ember from 'ember';
import {mobileMax, desktopMin} from '../utils/responsive-utils'

const {Mixin, inject} = Ember;

/**
 * Mixin wrapping functionality of ui-responsive Ember addon to keep it's
 * customization in the one place.
 *
 * Addon allows to check on which device - mobile or desktop user currently is,
 * viewport, screen and body sizes.
 * Example usage:
 * 	this.get('responsive.isDesktop')
 * more: https://github.com/lifegadget/ui-responsive
 */
export default Mixin.create({
	responsive: inject.service(),

	breakpoints: [
		{id: 'mobile', max: mobileMax},
		{id: 'desktop', min: desktopMin}
	],

	init() {
		this._super();
		this.get('responsive').setBreakpoints(this.get('breakpoints'));
	}
});
