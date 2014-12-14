define([
    "backbone",
    "text!../../templates/tpl-cart-product.html"
], function(Backbone, cartProductTemplate){
    var CartProductView = Backbone.View.extend({
        // wrapper tag
        tagName: "li",
        className: 'span12',
        // template for one product
        cartProductTemplate: _.template(cartProductTemplate),

        initialize: function () {
            // Listen to events with model
            this.model.bind("change", this.render, this);
            this.model.bind("destroy", this.remove, this);
        },
        // Render this view
        render: function () {
            // get model object
            var model = this.getItem();
            $(this.el).html(this.cartProductTemplate(model));
            this.inputQuantity = $(this.el).find('input[type=number]');
            return $(this.el);
        },
        events: {
            // Listen to click and change to button and number field
            "change input[type=number]": "chaingeQuantity",
            "click .remove": "removeItem"
        },
        // remove DOM element
        remove: function () {
            $(this.el).remove();
        },
        // remove model
        removeItem: function() {
            this.model.destroy();
        },
        chaingeQuantity: function() {
            var quantity = Number(this.inputQuantity.val());
            if (!quantity)
                this.model.destroy();
            else
                this.model.changeQuantity(quantity);
        },
        getItem: function() {
            return this.model.toJSON();
        }
    });

    return CartProductView;
});
