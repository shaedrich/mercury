import {stringify} from 'querystring';

export const whitelist = [
	'color-community-header',
	'color-links',
	'color-page'
];

export function injectSassVariables(templateData) {
	const rawData = templateData.wikiVariables.theme;
	let variables = {};

	if (rawData) {
		for (let key in rawData) {
			if (rawData.hasOwnProperty(key) && whitelist.indexOf(key) > -1) {
				variables[key] = rawData[key];
			}
		}
	}

	templateData.sassParams = stringify(variables);

	return templateData;
}
