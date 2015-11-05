var express = require('express');
var router = express.Router();
var logger = require('../lib/logger').logger("routes");
var searchService = require('../services').Search;
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
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
    if (!keyword) {
        res.redirect("/");
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
                data: displayData
            });
        }
    });
    
});

module.exports = router;
