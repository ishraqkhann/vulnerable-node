const log4js = require("log4js");
const url = require("url");
const express = require('express');
var auth = require("../model/auth");
const router = express.Router();

var logger = log4js.getLogger('vnode')

// Login template
router.get('/login', function(req, res, next) {

    const url_params = url.parse(req.url, true).query;

    res.render('login', {returnurl: url_params.returnurl, auth_error: url_params.error});
});


// Do auth
router.post('/login/auth', function(req, res) {

    const user = req.body.username;
router.post('/login/auth', function(req, res) {

    const user = req.body.username;
    const password = req.body.password;
    const returnurl = req.body.returnurl;
    var user = req.body.username;
    var password = req.body.password;
    var returnurl = req.body.returnurl;

    logger.error("Tried to login attempt from user = " + user);

    auth(user, password)
        .then(function (data) {
            req.session.logged = true;
            req.session.user_name = user;

            if (returnurl == undefined || returnurl == ""){
                returnurl = "/";
            }

            res.redirect(returnurl);
        })
        .catch(function (err) {
            res.redirect("/login?returnurl=" + returnurl + "&error=" + err.message);
        });

});

// Do logout
router.get('/logout', function(req, res, next) {

    req.session.logged = false;
    req.session.user = null;

    res.redirect("/login")
});

module.exports = router;
