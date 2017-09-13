import {stringify} from 'querystring';

export const whitelist = [
	'color-community-header',
	'color-links',
	'color-page'
];

function getSassParams(theme, override) {
	let variables = {};

	if (theme) {
		for (let key in theme) {
			if (theme.hasOwnProperty(key) && whitelist.indexOf(key) > -1) {
				variables[key] = theme[key];
			}
		}
	}

	if (override) {
		variables['color-links'] = override;
	}

	return variables;
}


export function injectSassVariables(templateData) {
	templateData.sassParams = stringify(
		getSassParams(templateData.wikiVariables.theme, templateData.wikiVariables.discussionColorOverride)
	);
	return templateData;
}
