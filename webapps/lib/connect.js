var mongoose = require("mongoose");
var config = require("config");
var urllib = require('url');
var logger = require('./logger').logger("connect");


var getMongoConnection = function(config) {
    var mongodb_url = config.url;
    var conn = mongoose.connect(mongodb_url, function(e) {
        if (e) {
            logger.error(e.message);
        }
        logger.info("connect " + mongodb_url + " yes");
    });
    return conn;
};

var getConnection = function(conn_config, callback){
    var mongodb = getMongoConnection(conn_config.mongodb);
    if (!mongodb) {
        callback("Fail to get connection");
    }
    var conn = {};
    conn.mongodb = mongodb;
    callback(null,conn);
};

exports.init = function(callback) {
    getConnection(config.connect, function(err, conn) {
        if (err) {
            return callback(err);
        }
        exports.mongodb_connect = conn.mongodb;
        callback(null, conn);
    });
};