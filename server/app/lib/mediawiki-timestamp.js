import moment from 'moment';

/**
 * Converts date to MediaWiki format (YYYYMMDDHHMMSS)
 * @return {string}
 */
export function momentToTimestamp(moment) {
	return moment.format('YYYYMMDDHHmmss');
}

/**
 * Provides current timestamp in MediaWiki format (YYYYMMDDHHMMSS)
 * @return {string}
 */
export function timestampNow() {
	return momentToTimestamp(moment());
}

/**
 * Converts date to MediaWiki format (YYYYMMDDHHMMSS)
 * @param {Date} date
 * @return {string}
 */
export function dateToTimestamp(date) {
	return momentToTimestamp(moment(date));
}
