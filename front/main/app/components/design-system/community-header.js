import Ember from 'ember';
import Headroom from '../../mixins/headroom';
import {track, trackActions} from 'common/utils/track';

const {Component, Object: EmberObject, computed} = Ember;

export default Component.extend({
	communityHeaderStyle: new Ember.Handlebars.SafeString(`background-image: url(http://static.wikia.nocookie.net/c4a1302b-476b-468d-8766-2f36a6ace398);`),
	model: {
		wordmark: {
			image: {
				url: 'http://img3.wikia.nocookie.net/__cb23/starwars/images/8/89/Wiki-wordmark.png',
				width: '250',
				height: '65',
			},
			label: 'Wookiepedia',
			href: 'http://google.pl',
		},
		sitename: {
			href: 'http://google.pl',
			label: {
				value: 'Wookiepedia'
			}
		},
		counter: {
			value: 1234,
			label: {
				key: 'asd'
			}
		}
	}
});
