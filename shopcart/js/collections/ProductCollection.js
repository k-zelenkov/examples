define([
    'backbone',
    '../models/ProductModel'
], function(Backbone, ProductModel){
    var ProductCollection = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: ProductModel,
        // Reference to data on server
        url: "data/products.json"
    });

    return new ProductCollection;
});