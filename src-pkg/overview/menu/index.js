"use strict";

var Controller = require('agency-pkg-base/Controller');
var DomModel = require('agency-pkg-base/DomModel');
var dataTypeDefinition = require('agency-pkg-base/dataTypeDefinition');
module.exports = Controller.extend({

    modelConstructor: DomModel.extend(dataTypeDefinition, {
        session: {}
    }),

    events: {
        'click [data-pkg="accordeon/menu"]': onClick,
            'click [data-pkg="accordeon/external"]': onClickExternal,
        'click .js-click-toggle': onClickToggle
    },

    initialize: function() {
        Controller.prototype.initialize.apply(this, arguments);

        this.links = this.el.querySelectorAll('[data-pkg="accordeon/menu"]');

        this.targetModel.on('change:url', onUrlChange.bind(this));
        if (this.targetModel.url) {
            onUrlChange.bind(this)(this.targetModel, this.targetModel.url);
        }
    },

});

function onClick(e) {
    e.preventDefault();
    if (this.targetModel.url !== e.target.href) {
        this.targetModel.showOverlay = true;
        this.targetModel.url = e.target.href;
    }
}

function onClickExternal(e) {

}

function onClickToggle(e) {
    e.preventDefault();
    this.targetModel.showMenu = !this.targetModel.showMenu;
}

function onUrlChange(model, url) {
    if (this.currentItemEl) {
        this.currentItemEl.classList.remove('selected');
    }
    console.log(this.links);
    this.links.forEach(function(linkEl) {
        if (linkEl.href === url) {
            this.currentItemEl = linkEl;
            this.currentItemEl.classList.add('selected');
            return true;
        }
    }.bind(this));
}
