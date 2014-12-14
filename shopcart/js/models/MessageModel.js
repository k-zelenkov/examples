define([
    "backbone"
], function(Backbone){
    var MessageModel = Backbone.Model.extend({
        // Default properties for this model
        defaults: {
            text: '',
            type: ''
        },
        // Override Backbone.sync function
        sync: function() {}
    });

    return MessageModel;
});

