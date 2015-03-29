define([
    "backbone",
    "../collections/ProductCollection",
    "./ProductView",
    "text!templates/tpl-products.html"
], function(Backbone, ProductCollection, ProductView, productsTemplate){
        var ProductsView = Backbone.View.extend({
            el: "#products",
            productsTemplate: _.template(productsTemplate),
            // Reference to this view's collection.
            collection: ProductCollection,
            initialize: function () {
                this.collection.bind("add", this.addOne, this);
                this.collection.bind("reset", this.render, this);
                this.collection.fetch();
            },

            render: function () {
                $(this.el).html(this.productsTemplate());
                this.addAll();
            },
            // Add all models' collection
            addAll: function () {
                this.collection.each(this.addOne, this);
            },
            // Add one model
            addOne: function (model) {
                // Create new view for model
                var view = new ProductView({ model: model });
                if ($(".thumbnails:last li", this.el).length == 2)
                    $(this.el).append(this.productsTemplate());
                $(".thumbnails:last", this.el).append(view.render());
            }
        });

        return ProductsView;
    }
);
