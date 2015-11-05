var md5 = require('MD5');
var Topic = require('./model').Topic;
module.exports = {
    findByPower: function(start, count, callback) {
        Topic
        .find()
        .sort('power')
        .where('power')
        .gte(start)
        .limit(count)
        .exec(callback);
    }
};