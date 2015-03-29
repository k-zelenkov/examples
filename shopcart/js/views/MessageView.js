define([
    "backbone",
    "text!templates/tpl-message.html"
], function(Backbone, messageTemplate){
    var MessageView = Backbone.View.extend({
        tagName: "div",
        className: "alert",
        messageTemplate: _.template(messageTemplate),

        initialize: function () {
            this.model.bind('destroy', this.removeItem, this);
        },
        render: function () {
            var model = this.getItem();
            $(this.el).addClass("alert-"+ model.type);
            $(this.el).append(this.messageTemplate(model));
            return $(this.el);
        },
        removeItem: function (model) {
            var self = this;
            // Hide and remode DOM element after some time
            $(self.el).fadeOut(300);
            setTimeout(function() {
                self.remove();
            }, 300);
        },

        getItem: function() {
            return this.model.toJSON();
        }
    });

    return MessageView;
});
