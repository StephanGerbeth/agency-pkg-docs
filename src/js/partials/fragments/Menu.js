"use strict";

var Controller = require('agency-pkg-base/Controller');
var DomModel = require('agency-pkg-base/DomModel');
var dataTypeDefinition = require('agency-pkg-base/dataTypeDefinition');

module.exports = Controller.extend({

    modelConstructor: DomModel.extend(dataTypeDefinition, {
        session: {
        }
    }),

    events: {
        'click .js-click-toggle' : onClickToggle
    },

    initialize: function() {
        Controller.prototype.initialize.apply(this, arguments);

    },

});

function onClickToggle(e) {
    e.preventDefault();
    this.el.classList.toggle('show');
}
