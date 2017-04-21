import ESAPI from 'node-esapi';


export function encodeForJavaScript(value) {
	return ESAPI.encoder().encodeForJavaScript(value);
}
