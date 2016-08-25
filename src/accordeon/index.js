"use strict";

var Controller = require('agency-pkg-base/Controller');
var DomModel = require('agency-pkg-base/DomModel');
var dataTypeDefinition = require('agency-pkg-base/dataTypeDefinition');
module.exports = Controller.extend({

    modelConstructor: DomModel.extend(dataTypeDefinition, {
        session: {
            toggleSelector: {
                type: 'string',
                required: true,
                default: function() {
                    return '> div > .js-click-accordeon-toggle';
                }
            },
            opened: {
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
        this.model.on('change:opened', function(model, opened) {
            this.el.classList.toggle('js-opened', opened);
        }.bind(this));
        $(this.model.toggleSelector, this.el).on('click', onClickToggle.bind(this));
    },

});

function onClickToggle() {
    this.model.opened = !this.model.opened;
}
