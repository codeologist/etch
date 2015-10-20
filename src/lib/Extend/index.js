

    "use strict";

    var window = require("../Window");

    function Extend( Extension ){

        var ext = new Extension();

        Object.keys( ext ).forEach(function(key){
            window.prototype[key] = ext[key];
        });
    }

    module.exports = Extend;