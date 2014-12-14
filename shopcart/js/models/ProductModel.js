define([
    "backbone"
], function(Backbone){
    var ProductModel = Backbone.Model.extend({
        // Default properties for this model
        defaults: {
            productId: '',
            title: '',
            price: 0,
            description: '',
            img: ''
        }
    });

    return ProductModel;
});

