
        "use strict";

    function AppendChild( el ){

        if ( !el ){
            return false;
        }


        this.childNodes.push( el );

        el.parent = this;
        el.documentElement = this.documentElement;

        return true;
    }

    module.exports = AppendChild;