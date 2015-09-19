
    "use strict";

    var assert = require('assert');
    var EtchFlatten = require("../../../src/lib/utils/EtchFlatten");

    describe('EtchFlatten', function(){

            it('should convert an EtchTree into a flat Array', function(done){

                var EtchTree = {
                    childNodes:[ {} ]
                };

                var FlatTree = EtchFlatten( EtchTree );


                assert( typeof FlatTree[0] === "object");
                assert( typeof FlatTree[1] === "object");


                done();
            });
    });