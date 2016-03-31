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

    if (index.meta && index.metaIsCommented()) {
        console.log('descomentando meta...');
        var indexFile = index.indexFile().replace(index.regex.metaCommented, index.meta);

        fs.writeFileSync(index.indexPath, indexFile, 'utf8');
    } else {
        console.log('meta não está comentado');
    }
}

//module.exports(null);//test