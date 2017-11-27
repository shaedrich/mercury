/**
 * settings for the application, used by default by prod environments
 */
export default {
	userRegistationService: {
		internalUrl: `http://prod.${process.env.WIKIA_DATACENTER}.k8s.wikia.net/user-registration`
	}
};
