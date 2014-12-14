define([
    'backbone',
    'models/MessageModel'
], function(Backbone, MessageModel){
    var MessageCollection = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: MessageModel
    });

    return new MessageCollection;
});