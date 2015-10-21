
    "use strict";


    function WindowReady( callback ){
        this.queueReadyCallbackAwaitingPromiseResolution( callback );
    }

    module.exports = WindowReady;