define([
    "backbone",
    "views/ProductsView",
    "views/CartBlockView",
    "views/CartView"
], function(Backbone, ProductsView, CartBlockView, CartView){
    var Controller = Backbone.Router.extend({
        // Define pages and functions for its
        routes: {
            "": "main",
            "cart": "cart"
        },
        main: function () {
            // It's loading when we are on main-page
            if (this.productsView != null)
                this.productsView.render();
            else
                this.productsView = new ProductsView;
            if (this.cartBlockView != null)
                this.cartBlockView.render();
            else
                this.cartBlockView = new CartBlockView;
            $(".cart").hide();
            $(".shop").show();
        },
        // It's loading when we are on cart-page
        cart: function () {
            if (this.cartView != null)
                this.cartView.render();
            else
                this.cartView = new CartView;
            $(".shop").hide();
            $(".cart").show();
        }
    });

    return Controller;
});
