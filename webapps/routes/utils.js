function _getUser (req) {
    var user = req.session.user;
    return user;
}

function _checkSignIn(req,res,next) {
    var user = _getUser(req);
    if (user) {
        next();
    }
    else {
        return res.redirect("/");
    }
}

function _checkNotSignIn(req,res,next) {
    var user = _getUser(req);
    if (!user) {
        next();
    }
    else {
        return res.redirect("/");
    }
}

var utils = {
    checkSignIn: _checkSignIn,
    checkNotSignIn: _checkNotSignIn
};

module.exports.Utils = utils;