"use strict";

var Controller = require('agency-pkg-base/Controller');
var DomModel = require('agency-pkg-base/DomModel');
var dataTypeDefinition = require('agency-pkg-base/dataTypeDefinition');

module.exports = Controller.extend({

    modelConstructor: DomModel.extend(dataTypeDefinition, {
        session: {
            url: {
                type: 'String',
                required: true,
                default: function() {
                    return null;
                }
            },
            showOverlay: {
                type: 'Boolean',
                required: true,
                default: function() {
                    return true;
                }
            },
            showMenu: {
                type: 'Boolean',
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

        onChangeShowOverlay.bind(this)(this.model, this.model.showOverlay);
        onChangeShowMenu.bind(this)(this.model, this.model.showMenu);
    }

});

function onChangeShowOverlay(model, showOverlay) {
    this.el.classList.toggle('js-show-overlay', showOverlay);
}

function onChangeShowMenu(model, showMenu) {
    this.el.classList.toggle('js-show-menu', showMenu);
}
