// Use require.js
requirejs.config({
//    baseUrl: '..',
    // paths to libraries
    paths: {
        jquery: "libraries/jquery",
        underscore: "libraries/underscore",
        backbone: "libraries/backbone",
        localStorage: "libraries/backbone.localStorage",
        text: "libraries/text"
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
    "controllers/Controller",
    "views/MessagesView"
], function(Controller, MessagesView){
    var messagesView = new MessagesView;

    window.controller = new Controller;
    Backbone.history.start();
});