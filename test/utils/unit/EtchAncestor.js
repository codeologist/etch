
    "use strict";

    var assert = require('assert');
    var EtchAncestors = require("../../../src/lib/utils/EtchAncestors");

    describe('EtchAncestors', function(){

        it('should climb a tree', function(done){

            var EtchTree = {
                childNodes:[ {} ]
            };

            EtchTree.childNodes[0].parent = EtchTree;
            var a = EtchAncestors( EtchTree.childNodes[0] );

            assert( a.length === 2);

            done();
        });


        it('should fail', function(done){

            assert.equal( EtchAncestors( null ).length, 0  );
            assert.equal( EtchAncestors( undefined ).length, 0   );
            assert.equal( EtchAncestors( 1 ).length, 0   );
            assert.equal( EtchAncestors( "" ).length, 0   );
            assert.equal( EtchAncestors( "text" ).length, 0   );

            done();
        });
    });