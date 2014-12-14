define([
    "backbone",
    "models/CartProductModel",
    "localStorage"
], function(Backbone, CartProductModel){
    var CartProductCollection = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: CartProductModel,
        // Reference to local storage which used backbone.LocalStorage adapter
        localStorage: new Backbone.LocalStorage("cart-with-cars"),
        // Reference to alternative data (for example)
        syncUrl: "data/cart.json",
        // Function realize data communication with server
        // method: "create", "read", "update", "delete"
        syncServer: function(method) {
            return Backbone.ajaxSync(method, this, {url: this.syncUrl});
        },
        // Function check availability model in this collection by product ID
        // if model doesn't exist then it return false else return model
        doesProductExist: function(productId) {
            var existsModel = this.find(function (model) {
                return (model.get("productId") == productId) ? model : false;
            });
            return (existsModel != null) ? existsModel : false;
        }
    });

    return new CartProductCollection;
});