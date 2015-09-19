
function convert(Obj) {
    var cache = [];

    var source = JSON.stringify(Obj, function (key, value) {

        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return;
            }
            // Store value in our collection
            cache.push(value);
        }

        if (["parent"].indexOf(key) === -1) {
            return value;
        }


    }, "    ");
    cache = null;
    return source;
}

function ToSource( doc ){
    this.document = doc;
}
ToSource.prototype.save = function( filename ){
    fs.writeFileSync( filename, convert( this.document ) );
};
