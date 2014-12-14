define([
    "backbone",
    "collections/CartProductCollection",
    "views/CartProductView",
    "collections/MessageCollection",
    "text!../../templates/tpl-cart.html",
    "text!../../templates/tpl-other.html"
], function(Backbone, CartProductCollection, CartProductView, MessageCollection, cartTemplate, cartOtherTemplate){
    var CartView = Backbone.View.extend({
        // DOM element
        el: "#cart",
        // Template for cart
        cartTemplate: _.template(cartTemplate),
        // Template for example of loading from server
        cartOtherTemplate: _.template(cartOtherTemplate),
        // Reference to this view's collection.
        collection: CartProductCollection,
        initialize: function () {
            // Listen to events with collection
            this.collection.bind("add", this.addOne, this);
            this.collection.bind("reset", this.render, this);
            // Get collection's default models
            this.collection.fetch();
        },
        events: {
            "click .go-back": "goToShop",
            "click .load-from-server": "loadCartFromServer"
        },
        goToShop: function() {
            controller.navigate("", true);
        },
        render: function () {
            $(this.el).html(this.cartTemplate());
            this.addAll();
            $(this.el).append(this.cartOtherTemplate({total: this.total}));
        },
        // Add all models' collection
        addAll: function () {
            this.total = 0;
            this.collection.each(this.addOne, this);
            this.calcucaleTotal();
        },
        // Add one model
        addOne: function (model) {
            view = new CartProductView({ model: model });
            if ($(".thumbnails:last li", this.el).length)
                $(this.el).append(this.cartTemplate());
            $(".thumbnails:last", this.el).append(view.render());
            model.bind("change", this.calcucaleTotal, this);
            model.bind("destroy", this.initialize, this);
        },
        calcucaleTotal: function(model) {
            var self = this;
            self.total = 0;
            this.collection.each(function(model) {
                self.total = Number(self.total) + model.get("summ");
            }, this);
            $("#cart-other", this.el).html(this.cartOtherTemplate({total: this.total}));
        },
        // For example load data from server
        loadCartFromServer: function() {
            var self = this;
            self.collection.syncServer("read").done(function(data) {
                _.each(data, function(elem) {
                    // Find model in collection
                    modelExists = self.collection.doesProductExist(elem.productId);
                    if (!modelExists) {
                        // Create new model and add to collection
                        self.collection.create(elem);
                        MessageCollection.create({type: "success", text: elem.title +" is added in your cart"});
                    }
                    else {
                        // update quantity for exist model
                        modelExists.addQuantity(elem.quantity);
                        MessageCollection.create({type: "success", text: "Quantity of "+ elem.title +" is updated in your cart"});
                    }

                });
                self.collection.fetch();
            });
//            if (self.destroy) {
//                self.destroy();
//            };
        }
    });

    return CartView;
});
