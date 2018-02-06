/**
 * @returns {void}
 */
export default function () {
	this.passthrough('/write-blanket-coverage');
	this.passthrough('https://localhost/**');

	this.passthrough('/wikia.php');
	this.passthrough('/api.php');

	// We have /front/main/assets prefix hardcoded in route and testem use /assets
	// This is a quick (hopefully temporary) fix
	this.get('/front/main/assets/vendor/cropper/cropper.min.js', {});

	this.get('/wikia.php', (schema, request) => {
		const {controller, method, title} = request.queryParams;

		if (controller === 'CuratedContent' && method === 'getData') {
			return schema.curatedContentEditorItems.first();
		}

		throw new Error(`Controller or method response isn't yet mocked`);
	});
}
