
    "use strict";


    function DocumentReady( callback ){
        this.window.queueReadyCallbackAwaitingPromiseResolution( callback );
    }

    module.exports = DocumentReady;