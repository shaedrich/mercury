import Ember from 'ember';
import {track, trackActions} from 'common/utils/track';

const {Component, Object: EmberObject, computed} = Ember;

export default Component.extend({
	communityHeaderStyle: new Ember.Handlebars.SafeString(`background-image: url(http://static.wikia.nocookie.net/c4a1302b-476b-468d-8766-2f36a6ace398);`),
	model: EmberObject.create(M.prop('communityHeader'))
});
