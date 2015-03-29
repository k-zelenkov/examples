define([
    "backbone",
    "../collections/MessageCollection",
    "./MessageView",
    "text!templates/tpl-messages.html"
], function(Backbone, MessageCollection, MessageView, messagesTemplate){
    var MessagesView = Backbone.View.extend({
        el: "#messages",
        messagesTemplate: _.template(messagesTemplate),
        collection: MessageCollection,
        initialize: function () {
            this.collection.bind('add', this.addOne, this);
            this.collection.bind('reset', this.render, this);
            this.render();
        },

        render: function () {
            $(this.el).html(this.messagesTemplate());
        },
        addAll: function () {
            this.collection.each(this.addOne, this);
        },
        addOne: function (model) {
            view = new MessageView({ model: model });
            $(".wrapper", this.el).append(view.render());
            // Remove model after some time
            setTimeout(function() {
                model.destroy();
            }, 2000);
        }
    });

    return MessagesView;
});
