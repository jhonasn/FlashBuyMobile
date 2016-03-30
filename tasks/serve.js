var browserSync = require('browser-sync');
var proxyMiddleware = require('http-proxy-middleware');

var packageJson = require('../package.json');

var proxies = [];

for (var addr in packageJson.proxy) {
    var redirect = packageJson.proxy[addr];
    var proxy = proxyMiddleware('/' + addr, {
        target: redirect,
        onProxyReq: function (proxyReq, req, res) {
            console.log('HTTP REQ');
            //console.log(proxyReq);
            //console.log(req);
            proxyReq.setHeader('Accept', 'application/json');
        }
    });
    proxies.push(proxy)
}

browserSync({
    server: {
        baseDir: "./www",
        port: 3000,
        middleware: proxies
    }
});