
    "use strict";


    function ObjectSchema(){

    }

    ObjectSchema.prototype = {

        Schema:{

            Preferences:{
                Event:{
                    PREFIX: "on"
                }
            },
            Elements:{},
            ENUMS:{
                TYPE:{
                    ELEMENT_NODE: 1,
                    TEXT_NODE: 3,
                    PROCESSING_INSTRUCTION_NODE: 7,
                    COMMENT_NODE: 8,
                    DOCUMENT_NODE: 9,
                    DOCUMENT_TYPE_NODE: 10,
                    DOCUMENT_FRAGMENT_NODE: 11,
                    STYLE_NODE: 1001
                }
            }
        }
    };

    module.exports=ObjectSchema;