
/**
 * Gets timestamp from date that can be iso string or epoch object
 * @param {string|object} date
 * @returns {number} - timestamp
 */
function convertToTimestamp(date) {
	return typeof date === 'string' ? (new Date(date)).getTime() / 1000 : date.epochSecond;
}

export {convertToTimestamp}
