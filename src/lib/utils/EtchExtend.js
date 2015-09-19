

    "use strict";

    /**
     * Extend Extended with Extender.  Existing propertys are updated and new properties are added
     * @param extended
     * @param extender
     * @constructor
     */
    function EtchExtend( extended, extender ) {

        var d;

        if ( Object.isExtensible(extended) === false ){
            return extended;
        }

        Object.keys( extender ).forEach( function( key ){

            if ( typeof extender[key] !== "object" ){
                d=  Object.getOwnPropertyDescriptor( extended, key );

                if ( !(key in extended) || d.configurable || d.writable ) {
                    extended[ key ] = extender[ key ];
                }

            }

        });
        return extended;
    }

    module.exports = EtchExtend;