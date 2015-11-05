var md5 = require('MD5');
var User = require('./model').User;
module.exports = {
    add: function(values, callback) {
        var time = new Date();
        var user = new User({
            username: values.username,
            nickname: values.username
        });
        user.save(callback);
    },
    find: function(filter, count, callback) {
        User
        .find(filter)
        .limit(count)
        .exec(callback);
    },
    findOne: function(filter,callback) {
        User
        .findOne(filter)
        .exec(callback);
    },
    // verify: function(username, password, callback) {
    //     User
    //     .findOne()
    //     .or([
    //         {username:username,password:md5(password)},
    //         {email:username,password:md5(password)},
    //     ])
    //     .exec(function(err,user){
    //         if (err) {
    //             return callback(err);
    //         }
    //         if (!user) {
    //             return callback(null,null,"用户名密码不正确");
    //         }
    //         else {
    //             return callback(null, user);
    //         }
    //     });
    // },
    update: function(username, values, callback){
        User
        .update({username:username},
                {$set:values},
                { multi: true },
                function (err, raw) {
                  if (err) return callback(err);
                  return callback(null,raw);
                });
    }
};