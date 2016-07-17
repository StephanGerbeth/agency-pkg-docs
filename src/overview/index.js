"use strict";

var history = require('agency-pkg-services/history');
var Controller = require('agency-pkg-base/Controller');
var DomModel = require('agency-pkg-base/DomModel');
var dataTypeDefinition = require('agency-pkg-base/dataTypeDefinition');

module.exports = Controller.extend({

    modelConstructor: DomModel.extend(dataTypeDefinition, {
        session: {
            url: {
                type: 'string',
                required: true,
                default: function() {
                    return null;
                }
            },
            showOverlay: {
                type: 'boolean',
                required: true,
                default: function() {
                    return true;
                }
            },
            showMenu: {
                type: 'boolean',
                required: true,
                default: function() {
                    return false;
                }
            }
        }
    }),

    initialize: function() {
        Controller.prototype.initialize.apply(this, arguments);
        this.model.on('change:showOverlay', onChangeShowOverlay.bind(this));
        this.model.on('change:showMenu', onChangeShowMenu.bind(this));
        this.model.on('change:url', onChangeUrl.bind(this));

        onChangeShowOverlay.bind(this)(this.model, this.model.showOverlay);
        onChangeShowMenu.bind(this)(this.model, this.model.showMenu);


        if (history.registry.get('url')) {
            this.model.url = history.registry.get('url').value;
        }

        document.querySelector('html').classList.add('agency-pkg-docs-overview');

    }

});

function onChangeUrl(model, url) {
    history.update([{
        name: 'url',
        value: encodeURIComponent(url)
    }]);
}

function onChangeShowOverlay(model, showOverlay) {
    this.el.classList.toggle('js-show-overlay', showOverlay);
}

function onChangeShowMenu(model, showMenu) {
    this.el.classList.toggle('js-show-menu', showMenu);
}
