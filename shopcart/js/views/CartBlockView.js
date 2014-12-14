define([
    "backbone",
    "collections/CartProductCollection",
    "models/CartProductModel",
    "text!../../templates/tpl-cart-block.html"
], function(Backbone, CartProductCollection, CartProductModel, cartBlockTemplate){
    var CartBlockView = Backbone.View.extend({
        // DOM element
        el: "#cart-block",
        // Block template
        cartBlockTemplate: _.template(cartBlockTemplate),
        // Reference to this view's collection.
        collection: CartProductCollection,
        // Reference to this view's model.
        model: CartProductModel,
        initialize: function () {
            // Listen to events with model and collection
            this.collection.bind("add", this.render, this);
            this.collection.bind("reset", this.render, this);
//            this.model.bind("change", this.render, this);
//            this.model.bind("destroy", this.render, this);
            // Get collection's default models
            this.collection.fetch();
        },
        events: {
            // Event to click to button
            "click .btn": "goToCart"
        },
        goToCart: function() {
            // Go to cart-page
            controller.navigate("cart", true);
        },
        render: function () {
            this.count = 0;
            this.total = 0;
            this.collection.each(this.calculate, this);
            $(this.el).html(this.cartBlockTemplate({count: this.count, total: this.total}));
        },
        // Function calculate values for cart-block
        calculate: function(model) {
            var self = this,
                quantity = Number(model.get("quantity")),
                summ = Number(model.get("summ"));
            this.count = Number(this.count) + quantity;
            this.total = Number(this.total) + summ;
        }
    });

    return CartBlockView;
});
