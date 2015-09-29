
    "use strict";


    function DocumentReady( callback ){
        this.queueReadyCallbackAwaitingPromiseResolution( callback );
    }

    module.exports = DocumentReady;