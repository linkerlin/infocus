var express = require('express');
var router = express.Router();
var logger = require('../lib/logger').logger("routes");
var searchService = require('../services').Search;
var topicService = require('../services').Topic;
/* GET home page. */
router.get('/', function(req, res, next) {
    var user = req.session.user;
    //console.log("user",user);
    topicService.findByPower(1,5,function(e, topics){
        if (e) {
            next(e);
        } else {
            //console.log(topics);
            res.render('index',{
                user:user,
                topics:topics
            });
        }
    });
});

function makeDisplayData(data) {
    return {
        records:data.items,
        info:{
            total:parseInt(data.totalResults),
            searchTerms:data.searchTerms,
            itemsPerPage:parseInt(data.itemsPerPage),
            startIndex:parseInt(data.startIndex)
        }
    };
}

router.get('/search', function(req, res, next) {
    var query = req.query;
    var keyword= query.keyword;
    var user = req.session.user;
    if (!keyword) {
        res.redirect("/");
    }
    if (user) {
        query.userid = user.weiboid;
    } else {
        query.userid = "";
    }
    searchService.query(query,function(e,data,info) {
        if (e) {
            next(e);
        } else if (!data) {
            next({error:null,message:info});
        } else {
            var displayData = makeDisplayData(data);
            //console.log(displayData);
            res.render('search', {
                data: displayData,
                user: user
            });
        }
    });
    
});

module.exports = router;
