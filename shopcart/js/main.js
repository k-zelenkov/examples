// Use require.js
requirejs.config({
    baseUrl: './',
    // paths to libraries
    paths: {
        jquery: "js/libraries/jquery",
        underscore: "js/libraries/underscore",
        backbone: "js/libraries/backbone",
        localStorage: "js/libraries/backbone.localStorage",
        text: "js/libraries/text",
        templates: "templates"
    },
    // set dependences for libraries
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        localStorage: {
            deps: ["backbone"]
        }
    }
});
require([
    "js/controllers/Controller",
    "js/views/MessagesView"
], function(Controller, MessagesView){
    var messagesView = new MessagesView;

    window.controller = new Controller;
    Backbone.history.start();
});