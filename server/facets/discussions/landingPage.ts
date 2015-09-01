module landingPage {

	export function view (request: Hapi.Request, reply: Hapi.Response, context: any): Hapi.Response {
		var response: Hapi.Response;

		response = reply.view(
			'discussions/landing-page',
			{
				canonicalUrl: 'https://' + request.headers.host + request.path,
				language: request.server.methods.i18n.getInstance().lng(),
				mainPage: 'http://www.wikia.com',
				title: 'The hottest <appname> discussions with the biggest fans.'
			},
			{
				layout: 'discussions'
			}
		);

		return response;
	}

}
export = landingPage;
