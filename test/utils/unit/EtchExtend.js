
    "use strict";

    var assert = require('assert');
    var EtchExtend = require("../../../src/lib/utils/EtchExtend");

    describe('EtchExtend', function(){

        it('should not extend over unconfigurabe and unwritable properties', function(done){

            var a= {};
            var b = { test1:"xxx"};
            Object.defineProperty( a, "test1",{
                configurable:false,
                writable: false,
                value:"111"
            });

            var ex = EtchExtend( a, b );

            assert.equal( ex.test1, 111 );


            done();
        });

        it('should overwrite over unconfigurabe but writable properties', function(done){

            var a= {};
            var b = { test1:"xxx"};
            Object.defineProperty( a, "test1",{
                configurable:false,
                writable: true,
                value:"111"
            });

            var ex = EtchExtend( a, b );

            assert.equal( ex.test1, "xxx" );


            done();
        });

        it('should not extend non-extensible objects', function(done){

            var a= {};

            var b = { test1:"xxx"};
            Object.seal( a );

            var ex = EtchExtend( a, b );

            assert( !ex.test1 );


            done();
        });

        it('should extend non-existant properties', function(done){

            var a= {};
            var b = { test1:"xxx"};

            var ex = EtchExtend( a, b );

            assert.equal( ex.test1, "xxx" );


            done();
        });

        it('should skip type object', function(done){

            var a= {};
            var b = { test1:[],test2:{}};

            var ex = EtchExtend( a, b );

            assert( !ex.test1 );
            assert( !ex.test2 );


            done();
        });
    });