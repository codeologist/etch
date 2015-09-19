
    "use strict";

    var EtchExtend = require("../utils/EtchExtend");

    function EtchConsume( target ){
       var c = EtchExtend( this, target );

        Object.keys( target ).forEach( function( key ){
            delete target[key];
        });

    }

    module.exports = EtchConsume;