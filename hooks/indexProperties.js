var fs = require('fs');

var indexProperties = {
    indexFile: function () {
        return fs.readFileSync(indexProperties.indexPath, 'utf8');
    },
    indexPath: 'www/index.html',
    meta: null,
    metaIsCommented: function () {
        var indexFile = indexProperties.indexFile();
        var metaIsCommented = indexFile.match(indexProperties.regex.metaCommented);
        metaIsCommented = metaIsCommented ? metaIsCommented.length > 0 : false;

        return metaIsCommented;
    },
    regex: {
        getMeta: /\<meta\ http\-equiv\=\"Content\-Security\-Policy\"[\s\S]*?\>/g,
        metaCommented: /\<\!\-\-[\s\S]*?\<meta\ http\-equiv\=\"Content\-Security\-Policy\"[\s\S]*?\>[\s\S]*?\-\-\>/g
    }
};

var indexFile = indexProperties.indexFile();
var meta = indexFile.match(indexProperties.regex.getMeta);
if (meta && meta.length > 0) {
    meta = meta[0];
}

indexProperties.meta = meta;

module.exports = indexProperties;
