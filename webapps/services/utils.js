var http = require('http');
var search_server = require('config').search_server;
var _ = require('underscore');
var logger = require('../lib/logger').logger("utils");
var _post = function(raw_data,path,next) {
    // Build the post string from an object
    //var post_data = querystring.stringify(raw_data);
    //console.log("post_data",post_data);
    // An object of options to indicate where to post to
    var options = {
        host: search_server.host,
        port: search_server.port,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Set up the request
    var req = http.request(options, function(rsp) {
        var chunks = [];
        rsp.setEncoding('utf8');
        rsp.on('data', function(chunk) {
            chunks.push(chunk);
        });
        rsp.on('end', function() {
            var totalLength = chunks.reduce(function(len, buf) {
                return len + buf.length;
            }, 0);
            var jsonString = "";
            for (var i = 0; i < chunks.length; i++) {
                jsonString += chunks[i];
            }
            var json = "{}";
            try {
                json = JSON.parse(jsonString);
            } catch (err) {
                logger.error(err);
            }
            next(null,json);
        });
        rsp.on('error', function(e) {
            next(e);
        });
    })
    .on('error', function(e) {
        logger.error(options.path,e.stack || e);
        next(e);
    });
    // post the data
    console.log("post",path+" "+JSON.stringify(raw_data));
    req.write(JSON.stringify(raw_data));
    req.end();
};

function request(count, opt, next, done) {
    http.get(opt, function(rsp) {
        var chunks = [];
        rsp.setEncoding('utf8');
        rsp.on('data', function(chunk) {
            chunks.push(chunk);
        });
        rsp.on('end', function() {
            var totalLength = chunks.reduce(function(len, buf) {
                return len + buf.length;
            }, 0);
            var jsonString = "";
            for (var i = 0; i < chunks.length; i++) {
                jsonString += chunks[i];
            }
            var json = "{}";
            try {
                json = JSON.parse(jsonString);
            } catch (err) {
                logger.error(err);
            }
            done(null, json);
        });
    })
    .on('error', function(e) {
        logger.error(opt.path,e.stack || e);
        if (count<10) {
            next(count+1, opt, next, done);
        } else {
            done(e);
        }
    });
}

var _get = function(path,next) {
    var opt = {
        hostname: search_server.host,
        port: search_server.port,
        path: path,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    request(0,opt,request,next);
};

module.exports = {
    post:_post,
    get:_get,
    splitSkipNull: function(str,sep) {
        if (str) {
            return _.filter(str.split(sep),
                function(t) {
                    return t && t!="";
                });
        } else {
            return [];
        }
    }
};