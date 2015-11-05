var express = require('express');
var router = express.Router();
var logger = require('../lib/logger').logger("routes");
var userService = require('../services').User;
var WeiboStrategy = require("passport-weibo").Strategy;
var auth = require("config").auth;
var passport = require('passport');

passport.use(new WeiboStrategy({
        clientID: auth.clientID,
        clientSecret: auth.clientSecret,
        callbackURL: "http://infocus.xiabb.me/auth/weibo/callback"
    }, function(accessToken, refreshToken, profile, done) {
        userService.findOrCreate(profile, function (err, user) {
            console.log(user);
            return done(err, user);
        });
    })
);

passport.serializeUser(function(user, done) {
    done(null, JSON.stringify(user));
});

passport.deserializeUser(function(id, done) {
    done(null, JSON.parse(id));
});

router.get('/weibo',
    passport.authorize('weibo', { failureRedirect: '/' })
);

router.get('/weibo/callback',
    passport.authorize('weibo', { failureRedirect: '/' }),
    function(req, res) {
        var account = req.account;
        console.log("account",account);
        // Associate the weibo account with the logged-in user.
        account.save(function(err) {
            if (err) {
                res.redirect('/?error=登录失败');
            } else {
                req.session.user = account;
                res.redirect('/');
            }
        });
    }
);

router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
