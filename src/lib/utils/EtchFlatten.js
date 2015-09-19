
    "use strict";

    /**
     * Flatten an Etch Dom Tree from given node
     * @param node
     * @constructor
     */
    function EtchFlatten( node ) {

        var out = [];

        out.push( node );

        if ( node.childNodes ){
            node.childNodes.forEach(function( child ) {
                out = out.concat( EtchFlatten( child ) );
            }, this );
        }
        return out;
    }

    module.exports = EtchFlatten;