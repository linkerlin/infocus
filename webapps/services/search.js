var search_server = require("config").search_server;
var Utils = require("./utils");
module.exports = {
    query:function (options, next) {
        var path = search_server.path;
        path+="?query="+options.keyword;
        if (options.start) {
            path+="&start="+options.start;
        }
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