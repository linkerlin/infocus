#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app');
var debug = require('debug')('webapps:server');
var http = require('http');
var config = require('config');
var logger = require('./lib/logger').logger("server");
var connect = require("./lib/connect");
/**
 * Get port from environment and store in Express.
 */
connect.init(function(err, connect) {
    if(err){
        logger.error(err.stack || err);
        process.exit(1);
    }
    var app = require('./app');
    /**
     * Create HTTP server.
    */
    var http = require('http');
    var debug = require('debug')('juwairen:server');
    var server = http.createServer(app);

    var config = require("config");
    /**
     * Get port from environment and store in Express.
     */
    var port = normalizePort(config.port || process.env.PORT || '80');
    app.set('port', port);
    
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    logger.info("server started");
    /**
     * Normalize a port into a number, string, or false.
     */

    function normalizePort(val) {
        var port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    /**
     * Event listener for HTTP server "error" event.
     */

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */

    function onListening() {
        var addr = server.address();
        var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
        debug('Listening on ' + bind);
    }
});