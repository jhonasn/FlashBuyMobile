module.exports = function (context) {
    var fs = require('fs');
    var index = require('./indexProperties');

    //module.exports = {
    //    indexFile: fn(),
    //    indexPath: indexPath,
    //    meta: meta,
    //    metaIsCommented: fn(),
    //    regex: {
    //        getMeta: rgxGetMeta,
    //        metaCommented: rgxMetaCommented
    //    }
    //}

    if (index.meta && !index.metaIsCommented()) {
        console.log('comentando meta...');
        var metaCommented = '<!--' + index.meta + '-->';
        var indexFile = index.indexFile().replace(index.regex.getMeta, metaCommented);

        fs.writeFileSync(index.indexPath, indexFile, 'utf8');
    } else {
        console.log('está comentado');
    }
}

//module.exports(null);//test