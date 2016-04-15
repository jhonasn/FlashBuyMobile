/**
 * Module dependencies.
 */

var express = require('express'),
    mongoose = require('mongoose');

var app = module.exports = express.createServer();

// Configuration

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));

    //error handler
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send(err);
    });
});

app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
    app.use(express.errorHandler());
});

// Routes
mongoose.connect('mongodb://localhost/aulaJavaScriptAssincrono');

var tarefas = require('./api/tarefas');

app.get('/api/tarefas', tarefas.get);
app.put('/api/tarefas', tarefas.put);
app.delete('/api/tarefas', tarefas.delete);

app.listen(3000, function() {
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
