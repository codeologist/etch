
    "use strict";

    var assert = require('assert');
    var GetElementByTagName = require("../../../src/lib/Document/funcGetElementsByTagName");
    var EtchFlatten = require("../../../src/lib/utils/EtchFlatten");

    describe('GetElementsByTagName', function(){

        it('should find elements in an EtchTree by Tag Name', function(done){

            var EtchTree = {
                tagName:"HTML",
                childNodes:[ { tagName: "RED" }, { tagName: "GREEN" },  { tagName: "RED" }, { tagName: "BLUE" },{} ]
            };

            assert.equal( EtchFlatten( EtchTree ).length, 6, "There should be 6 nodes");
            assert.equal( GetElementByTagName.call( EtchTree, "*" ).length, 5 , "only returns elements with a tagname");

            assert.equal( GetElementByTagName.call( EtchTree, "RED" ).length, 2 );
            assert.equal( GetElementByTagName.call( EtchTree, "BLUE" ).length, 1 );
            assert.equal( GetElementByTagName.call( EtchTree ).length, 0, "no query = no data" );


            done();
        });
    });