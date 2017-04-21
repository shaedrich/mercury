/**
 * Keep this values in sync with $mobile-range and $desktop-range from _settings.scss
 */
export const mobileMax = 1063,
	desktopMin = 1064;


/**
 * @returns {boolean}
 */
export function isMobile() {
	return window.innerWidth < desktopMin;
}
