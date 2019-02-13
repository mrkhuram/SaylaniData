var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs')
var multer = require('multer')

var session = require("express-session")
var passport = require("passport")
var LocalStrategy = require('passport-local').Strategy


var server = express()

server.use(express.static('./frontend'))
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())


server.use(session({ secret: "secret-word" }));
server.use(passport.initialize());
server.use(passport.session());


var users = [
    { id: 1, username: "umar", password: 'abcd1234' },
    { id: 2, username: "test", password: '1234' },
]

passport.use(new LocalStrategy(
    function (username, password, next) {

        var user = users.find( (user) => {
            return user.username === username && user.password === password;
        })

        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }

    }
));

passport.serializeUser(function (user, next) {
    next(null, user.id);
});

passport.deserializeUser(function (id, next) {
    var user = users.find((user) => {
        return user.id === id;
    })

    next(null, user);
});

server.post('/login', passport.authenticate('local'), function (req, res) {
    
    
    res.redirect('/dashboard');

    
});






server.get('/dashboard', function (req, res) {

    if (!req.isAuthenticated()) {
        res.send("Login Required to visit this page")
    } else {
        res.send("Yes you're logged in, and your data is available here: " + req.user.username)
    }

});