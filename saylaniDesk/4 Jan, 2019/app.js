const express = require('express');
var bodyParser = require("body-parser");

var fs = require('fs');
// server.use(express.static("static"));
var multer = require("multer")

// passport....


var session = require("express-session")
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy
var server = express();


server.use(express.static('static'))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())


server.use(session({ secret: "secret-word" }));
server.use(passport.initialize());
server.use(passport.session());


passport.use(
    new FacebookStrategy(
      {
        clientID: "2180872622230602",
        clientSecret: "ff1014f790ad58d521ff40a9b2dd5b62",
        callbackURL: "https://localhost:8080/auth/facebook/callback",
        profileFields: ["id", "displayName", "picture.type(large)"]
      },
  
      (accessToken, refreshToken, profile, next) => {
        let user = users.find(user => {
          return user.id === profile.id;
        });
        if (user) {
          next(null, user);
        } else {
          user = {
            id: profile.id,
            username: profile.displayName,
            dp: profile.photos[0].value,
            fb: true
          };
          setUsers(user);
          next(null, user);
        }
      }
    )
  );
server.get('/auth/facebook',passport.authenticate('facebook', { scope: ['email'] })
);
// server.get('/auth/facebook',
//   passport.authenticate('facebook', { scope: ['email', 'publish_actions'] })
// );

server.get('/auth/facebook', passport.authenticate('facebook'));

server.get('/auth/facebook/callback',passport.authenticate('facebook', { successRedirect: '/',
        failureRedirect: '/dashboard'
    }));









var users = [
    { id: 1, username: 'Khuram', password: 'letme' },
    { id: 2, username: 'Jhonny', password: 'dontyou' }
]

passport.use(new LocalStrategy(
    function (username, password, next) {

        var user = users.find((user) => {
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

// multer's config

var customConfig = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, './uploads')
    },
    filename: function (req, file, next) {
        next(null, file.originalname)
    }
})

var upload = multer({ storage: customConfig })

// for multifiles.... where 10 is the limits of the files...
server.post('/pictures', upload.array('pic', 10), function (req, res) {
    // console.log(req.err)
    res.send("File has been Successfully Uploaded.")
})

// user can select only one file...
// server.post('/picture' , upload.single('pic'), function ( req,res){
//     console.log(req.file)
//     res.send("File has been Successfully Uploaded.")
// })

// server.get('/createFile' , (req, res)=>{
//     fs.appendFile('myfile/new.txt', "hello Everyone" + "\r\n" , err =>{
//         if (err) throw err;
//         res.send("file Successfully Created");
//     })
// })

//  to create new file

server.post('/newFile', (req, res, ) => {
    fs.appendFile("myfile/new1.txt", "Hey" + '\r\n', err => {
        if (err) throw err;
        res.send("File Successfully Created")
    })
})
// To read or to write data on the frontend or console

server.get('/getData', (req, res, next) => {
    fs.readFile('myfile/new1.txt', 'utf8', (err, data) => {
        if (err) next(err);
        res.send(data)
    })
})

// Delete file

// server.delete('/deleteFile' , (req, res, next)=>{
//     fs.unlink('myfile/new1.txt' , err =>{
//         if (err) next(err);
//         res.send("File Successfully Deleted.")
//     })
// })

server.delete('/deleteFile', (req, res, next) => {
    fs.unlink('myfile/new1.txt', err => {
        if (err) {
            next(err)
        } else {
            res.send("File Successfully Deleted.")

        }
    })
})


//  Error handler
server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send("Something Went Wrong In The Server.")
    // res.status(500).send(err.message)
})


server.get('/', (req, res) => {
    res.send('Hello World');

})

server.listen(8080);