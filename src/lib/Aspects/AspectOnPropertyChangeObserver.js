
        "use strict";

        var BLACKLIST = ["eventHandlers","documentElement","allowOnPropertyChangeEvents"];

        function AspectObservable(){

            Object.observe( this, function(changes) {

                    changes.forEach( function(change){
                        if ( change.type === "update"){
                            if ( BLACKLIST.indexOf( change.name ) === -1 ){

                                var event = this.documentElement.createEvent("propertychange");
                                event.data = change.object[change.name];

                                this.dispatchEvent( event );
                            }

                        }

                    }, this );

            }.bind( this ));
        }
        
        
        module.exports = AspectObservable;
