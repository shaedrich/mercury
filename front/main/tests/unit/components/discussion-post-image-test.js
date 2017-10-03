import {moduleForComponent, test} from 'ember-qunit';

moduleForComponent('discussion-post-image', 'Unit | Component | discussion post image', {
	unit: true
});

test('uncropped sources', function (assert) {
	const component = this.subject(),
		cases = [
			{
				image: {
					url: 'img.png',
					width: 500,
					height: 500
				},
				expected: [
					'img.png/scale-to-width-down/420 420w',
					'img.png 500w'
				]
			},
			{
				image: {
					url: 'img.png',
					width: 2000,
					height: 500
				},
				expected: [
					'img.png/scale-to-width-down/420 420w',
					'img.png/scale-to-width-down/520 520w',
					'img.png/scale-to-width-down/640 640w',
					'img.png/scale-to-width-down/767 767w',
					'img.png/scale-to-width-down/1063 1063w',
					'img.png 2000w'
				]
			}
		];

	cases.forEach((testCase) => {
		assert.deepEqual(component.getUncroppedSources(testCase.image), testCase.expected);
	});
});

test('cropped sources', function (assert) {
	const component = this.subject(),
		cases = [
			{
				image: {
					url: 'img.png',
					width: 500,
					height: 500
				},
				expected: [
					'img.png/zoom-crop-down/width/420/height/236 420w',
					'img.png/zoom-crop-down/width/500/height/281 500w'
				]
			},
			{
				image: {
					url: 'img.png',
					width: 2000,
					height: 500
				},
				expected: [
					'img.png/zoom-crop-down/width/420/height/236 420w',
					'img.png/zoom-crop-down/width/520/height/292 520w',
					'img.png/zoom-crop-down/width/640/height/360 640w',
					'img.png/zoom-crop-down/width/767/height/431 767w',
					'img.png/zoom-crop-down/width/1063/height/597 1063w',
					'img.png/zoom-crop-down/width/2000/height/1125 2000w'
				]
			}
		];

	cases.forEach((testCase) => {
		assert.deepEqual(component.getCroppedSources(testCase.image), testCase.expected);
	});
});
