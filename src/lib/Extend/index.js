

    "use strict";

    var window = require("../Window");
    var document = require("../Document");

    function Extend( Extension ){

        var ext = new Extension();

        if ( !ext.name ){
            throw "Extensions must be named";
        }

        window.prototype.ext[ext.name] = ext;

        if ( ext.window ) {
            Object.keys(ext.window).forEach(function (key) {
                window.prototype[key] = ext.window[key];
            });
        }
        if ( ext.document ) {
            Object.keys( ext.document ).forEach(function(key){
                document.prototype[key] = ext.document[key];
            });
        }
    }

    module.exports = Extend;