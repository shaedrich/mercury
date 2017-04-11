import moment from 'moment';

/**
 * Provides current timestamp in MediaWiki format (YYYYMMDDHHMMSS)
 * @return {string}
 */
export function timestampNow() {
	return momentToTimestamp(moment());
}

/**
 * Converts date to MediaWiki format (YYYYMMDDHHMMSS)
 * @return {string}
 */
export function momentToTimestamp(moment) {
	return moment.format('YYYYMMDDhhmmss');
}
