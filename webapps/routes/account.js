var express = require('express');
var router = express.Router();
var md5 = require('MD5');
var logger = require('../lib/logger').logger("account");
var utils = require('./utils').Utils;
var pageService = require('../services').Page;
var userService = require('../services').User;

router.get('/', utils.checkSignIn, function(req, res, next) {
    var user = req.session.user;
    //var userid = "1687910717";
    var userid = user.weiboid;
    userService.findOneFull({userid:userid},function(e, profile){
        console.log(profile);
        res.render('account',{user:profile});
    });
});

router.get('/mark', utils.checkSignIn, function(req, res, next) {
    var user = req.session.user;
    var userid = user.weiboid;
    //var userid = "1687910717";
    var query = req.query;
    var title = query.title;
    var url = query.url;
    var pubdate = query.pubdate;
    var markid = md5(userid+"_"+title+"_"+url+"pubdate");
    pageService.mark({
        userid:userid,
        url:url,
        markid:markid,
        pubdate:pubdate,
        title:title
    }, function(e, data){
        if (e) {
            next(e);
        } else {
            res.send({status:1,message:"success"});
        }
    });
});

module.exports = router;