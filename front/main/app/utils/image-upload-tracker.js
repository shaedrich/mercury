import {track as mercuryTrack} from 'common/utils/track';

const labels = {
	fileDropped: 'dropped',
	imageRemoved: 'removed',
	imageSelected: 'selected',
	invalidFileType: 'invalid-file-type',
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
	track(labels.fileDropped, 'gesture');
}

export function trackImageSelected() {
	track(labels.imageSelected, 'click');
}

export function trackImageRemoved() {
	track(labels.imageRemoved, 'click');
}

export function trackInvalidFileType(fileType) {
	track(labels.invalidFileType, fileType);
}

export function trackImageUploadSuccess() {
	track(labels.imageUpload, 'success');
}

export function trackImageUploadFailure(reason) {
	track(labels.imageUpload, reason);
}
