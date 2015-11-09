var md5 = require('MD5');
var UserMarkedPage = require('./model').UserMarkedPage;
var User = require('./model').User;
module.exports = {
    mark: function(values, callback) {
        console.log(values);
        var page = new UserMarkedPage({
                markid: values.markid,
                userid: values.userid,
                pagetitle:values.title,
                pubdate:values.pubdate,
                url:values.url
        });
        page.save(function(err){
            if (err) {
                callback(err);
            }
            User.findOne({weiboid:values.userid})
            .exec(function(e, user){
                if (e) {
                    callback(e);
                } else {
                    console.log(user);
                    user.markedpage.push({page:page});
                    user.save(callback);
                }
            });
        });
    }
};