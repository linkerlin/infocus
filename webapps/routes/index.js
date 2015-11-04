var express = require('express');
var router = express.Router();
var logger = require('../lib/logger').logger("routes");
var searchService = require('../services').Search;
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

function makeRecords(data) {
    return data.items;
}

router.get('/search', function(req, res, next) {
    var query = req.query;
    var keyword= query.keyword;
    if (!keyword) {
        res.redirect("/");
    }
    searchService.query({keyword:keyword},function(e,data,info) {
        if (e) {
            next(e);
        } else if (!data) {
            next({error:null,message:info});
        } else {
            var records = makeRecords(data);
            res.render('search', {
                records: records
            });
        }
    });
    
});

module.exports = router;
