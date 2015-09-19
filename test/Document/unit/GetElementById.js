
    "use strict";

    var assert = require('assert');
    var GetElementById= require("../../../src/lib/Document/funcGetElementById");

    describe('GetElementById', function(){

        it('should find an element in an EtchTree by id', function(done){

            var EtchTree = {
                id:"one",
                tagName:"HTML",
                childNodes:[ { tagName: "RED", id: "two" }, { tagName: "GREEN" },  { tagName: "RED" }, { tagName: "BLUE" },{ id: "three"} ]
            };



            assert.equal( GetElementById.call( EtchTree ), undefined );
            assert.equal( GetElementById.call( EtchTree, "" ), undefined );
            assert.equal( GetElementById.call( EtchTree, "one" ).id, "one" );
            assert.equal( GetElementById.call( EtchTree, "two" ).id, "two" );
            assert.equal( GetElementById.call( EtchTree, "three" ), undefined , "only returns elements with a tagname");

            done();
        });
    });