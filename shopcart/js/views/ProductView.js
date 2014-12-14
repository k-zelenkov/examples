define([
    "backbone",
    "collections/CartProductCollection",
    "collections/MessageCollection",
    "views/CartBlockView",
    "text!../../templates/tpl-product.html"
], function(Backbone, CartProductCollection, MessageCollection, CartBlockView, productTemplate){
    var ProductView = Backbone.View.extend({
        tagName: "li",
        className: "span6",
        productTemplate: _.template(productTemplate),

        render: function () {
            return $(this.el).append(this.productTemplate(this.getItem()));
        },
        events: {
            "click input[type=submit]": "addToCart"
        },
        // Add product to cart
        addToCart: function(event) {
            var productId = this.model.get("productId"),
                quantity = this.$el.find('input[type=number]').val(),
                attr = this.model.attributes,
                modelExists = CartProductCollection.doesProductExist(attr.productId);
            attr.quantity = quantity;
            // If product exist cart then update else create
            if (!modelExists) {
                CartProductCollection.create(attr);
                MessageCollection.create({type: "success", text: attr.title +" is added in your cart"});
            }
            else {
                modelExists.addQuantity(attr.quantity);
                MessageCollection.create({type: "success", text: "Quantity of "+ attr.title +" is updated in your cart"});
                viewCartBlock = new CartBlockView();
            }
        },
        getItem: function() {
            return this.model.toJSON();
        }
    });

    return ProductView;
});
