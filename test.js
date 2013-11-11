'use strict';
var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3003);
});

app.get('/', function (req, res, next) {
    fs.readFile(path.join(__dirname, 'test', 'index.html'), function (err, contents) {
        if (err) {
            next(err);
        } else {
            res.set('Content-Type', 'text/html');
            res.send(200, contents);
        }
    });
});

app.configure('development', function () {
    // allow front-end unit tests to be runnable from a server
    app.use(require('enchilada')({
        compress: false,
        src: path.join(__dirname, 'test'),
        cache: false,
        debug: true
    }));
    app.use(express.static(path.join(__dirname, 'node_modules')));
    app.use(express.static(path.join(__dirname, 'test')));
    app.use(express.static(path.join(__dirname, 'test', 'lib')));
});

/**********/
/* Server */
/**********/
require('http').createServer(app).listen(app.get('port'), function startApp() {
    console.log('Express server listening on port ' + app.get('port'));
});
