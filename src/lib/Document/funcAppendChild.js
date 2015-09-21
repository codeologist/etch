
        "use strict";

    function AppendChild( el ){

        if ( !el ){
            return false;
        }


        this.childNodes.push( el );

        el.parent = this;
        el.documentElement = this.documentElement;
        el.documentElement.dispatchEvent(  el.documentElement.createEvent("systemevent1") );

        return true;
    }

    module.exports = AppendChild;