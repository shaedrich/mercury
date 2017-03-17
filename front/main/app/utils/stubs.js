export const stubbingOn = false;

export function _notifications() {
	return JSON.parse(
		`{
	"notifications": [
		{
			"type": "upvote-notification",
			"community": {
				"id": "3035",
				"name": "Fallout Wiki"
			},
			"refersTo": {
				"uri": "http://fallout.wikia.com/d/p/2949419757075433419/r/2949421115216234452",
				"snippet": "asdfsaf",
				"createdBy": 5448092,
				"type": "discussion-post"
			},
			"events": {
				"total": 1,
				"totalUniqueActors": 1,
				"latestActors": [
					{
						"id": 5449498,
						"userName": "Testful-helper"
					}
				],
				"latestEvent": {
					"when": "2017-02-21T15:13:24.000Z",
					"causedBy": {
						"id": 5449498,
						"userName": "Testful-helper"
					},
					"uri": "http://fallout.wikia.com/d/p/2949419757075433419/r/2949421115216234452#5449498",
					"type": "discussion-upvote"
				}
			},
			"read": false
		},
		{
			"type": "announcement-notification",
			"community": {
				"id": "3035",
				"name": "Fallout Wiki"
			},
			"refersTo": {
				"uri": "http://fallout.wikia.com/d/p/2949419757075433419",
				"title": "Adding new colors for links that belong to Token, Uncommon, Rare, Super-Rare, Event and Legendary"
			},
			"events": {
				"totalUniqueActors": 1,
				"latestActors": [
					{
						"id": 5448092,
						"userName": "ThisUserLikesOreo"
					}
				],
				"latestEvent": {
					"when": "2017-02-21T15:11:45.000Z"
				}
			},
			"read": false
		},
		{
			"type": "upvote-notification",
			"community": {
				"id": "3035",
				"name": "Fallout Wiki"
			},
			"refersTo": {
				"uri": "http://fallout.wikia.com/d/p/2949419757075433419",
				"title": "asdfasf",
				"snippet": "asdfsaf",
				"createdBy": 5448092,
				"type": "discussion-thread"
			},
			"events": {
				"total": 1,
				"totalUniqueActors": 1,
				"latestActors": [
					{
						"id": 5449498,
						"userName": "Testful-helper"
					}
				],
				"latestEvent": {
					"when": "2017-02-21T15:13:07.000Z",
					"causedBy": {
						"id": 5449498,
						"userName": "Testful-helper"
					},
					"uri": "http://fallout.wikia.com/d/p/2949419757075433419/r/2949419757100599245#5449498",
					"type": "discussion-upvote"
				}
			},
			"read": false
		},
		{
			"type": "replies-notification",
			"community": {
				"id": "3035",
				"name": "Fallout Wiki"
			},
			"refersTo": {
				"uri": "http://fallout.wikia.com/d/p/2949419757075433419",
				"title": "asdfasf",
				"snippet": "asdfsaf",
				"createdBy": 5448092,
				"type": "discussion-thread"
			},
			"events": {
				"total": 1,
				"totalUniqueActors": 1,
				"latestActors": [
					{
						"id": 5449498,
						"userName": "Testful-helper"
					}
				],
				"latestEvent": {
					"when": "2017-02-21T15:11:45.000Z",
					"causedBy": {
						"id": 5449498,
						"userName": "Testful-helper"
					},
					"uri": "http://fallout.wikia.com/d/p/2949419757075433419/r/2949420354344323023",
					"snippet": "asdfsadfsf",
					"type": "discussion-post"
				}
			},
			"read": false
		}
	]
}`);
}
