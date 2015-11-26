App.ImageReviewMixin = Em.Mixin.create({

    /**
     * @returns {void}
     */
    activate() {
		console.log('ImageReviewMixin.activate()');
        //this.controllerFor('imagereview').set('enableShareHeader', true);
    },
    /**
     * @returns {void}
     */
    deactivate() {
        //this.controllerFor('imageReview').set('enableShareHeader', false);
    },

    /**
     * @param {*} controller
     * @param {App.ImageReviewModel} model
     * @returns {void}
     */
    renderTemplate(controller: any , model: any) {
        console.log("Image review renderTemplate called!");
        this.render('image-review', {
        	controller: controller,
        	model: model
        });
    }
});
