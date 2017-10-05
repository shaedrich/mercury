import {track as mercuryTrack, trackActions} from 'common/utils/track';

const labels = {
	fileDropped: 'dropped',
	imageRemoved: 'removed',
	imageSelected: 'selected',
	imageUpload: 'image-upload',
};

/**
 * @param {string} label
 * @param {string} action
 *
 * @returns {void}
 */
function track(label, action) {
	mercuryTrack({
		label,
		action,
		category: 'image-upload',
	});
}

export function trackFileDropped() {
	track(labels.fileDropped, trackActions.drop);
}

export function trackImageSelected() {
	track(labels.imageSelected, trackActions.click);
}

export function trackImageRemoved() {
	track(labels.imageRemoved, trackActions.click);
}

export function trackImageUploadSuccess() {
	track(labels.imageUpload, trackActions.success);
}

export function trackImageUploadFailure(reason) {
	track(labels.imageUpload, reason);
}
