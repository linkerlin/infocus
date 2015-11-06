var search_server = require("config").search_server;
var Utils = require("./utils");
var logger = require("../lib/logger").getLogger('search');
module.exports = {
    query:function (options, next) {
        var path = search_server.path;
        path+="?query="+encodeURIComponent(options.keyword+"/date");
        if (options.start) {
            path+="&start="+options.start;
        }
        logger.info("query ["+options.userid+"]",path);
        Utils.get(path,function(e, data) {
            if (e) {
                next(e);
            } else {
                var channels = data.channels;
                if (!channels || !channels.length) {
                    next(null,null,"search server error");
                } else {
                    next(null,channels[0]);
                }
            }
        });
    }
};