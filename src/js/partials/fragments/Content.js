"use strict";

var Controller = require('agency-pkg-base/Controller');
var DomModel = require('agency-pkg-base/DomModel');
var dataTypeDefinition = require('agency-pkg-base/dataTypeDefinition');

module.exports = Controller.extend({
    modelConstructor: DomModel.extend(dataTypeDefinition, {

    }),
    initialize: function() {
        Controller.prototype.initialize.apply(this, arguments);
        this.iframe = this.el.querySelector('iframe');
        this.iframe.addEventListener('load', onLoad.bind(this));
        if (this.targetModel) {
            this.targetModel.on('change:url', onUrlChange.bind(this));
        }
    }
});

function onUrlChange(model, url) {
    this.iframe.setAttribute('src', url + '?stats=false');
}

function onLoad() {
    this.targetModel.showOverlay = false;
}
