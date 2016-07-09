"use strict";

var Controller = require('agency-pkg-base/Controller');
var DomModel = require('agency-pkg-base/DomModel');
var dataTypeDefinition = require('agency-pkg-base/dataTypeDefinition');

module.exports = Controller.extend({

    modelConstructor: DomModel.extend(dataTypeDefinition, {
        session: {}
    }),

    events: {
        'click [href][target]': onClick,
        'click .js-click-toggle': onClickToggle
    },

    initialize: function() {
        Controller.prototype.initialize.apply(this, arguments);
    },

});

function onClick() {
    this.targetModel.showOverlay = true;
}

function onClickToggle(e) {
    e.preventDefault();
    this.targetModel.showMenu = !this.targetModel.showMenu;
}
