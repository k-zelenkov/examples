define([
    "backbone"
], function(Backbone){
    var CartProductModel = Backbone.Model.extend({
        // Default properties for this model
        defaults: {
            productId: '',
            title: '',
            price: 0,
            description: '',
            quantity: 0,
            img: '',
            isSync: false
        },
        initialize: function() {
            // If model no summ then summ define
            if (!this.get("summ")) {
                this.set({"summ": this.summ()});
            }
        },
        // Function calculate summ (qty * price)
        summ: function() {
            var quantity = Number(this.get("quantity")),
                summ = quantity * Number(this.get("price"));
            return summ;
        },
        changeQuantity: function(quantity) {
            // Important: begin set quantity after that set summ
            this.save({quantity: quantity});
            this.save({summ: this.summ()});
        },
        addQuantity: function(quantity) {
            var newQuantity = Number(this.get("quantity")) + Number(quantity);
            this.changeQuantity(newQuantity);
        }
    });

    return CartProductModel;
});

