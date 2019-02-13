 const express = require('express');
var bodyParser = require("body-parser");
var path = require('path')
var ejs = require('ejs')

var fs = require('fs');
// server.use(express.static("static"));
var multer = require("multer")
// passport....


var session = require("express-session")
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var server = express();


server.use(express.static('static'))
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())


server.use(session({ secret: "secret-word" }));
server.use(passport.initialize());
server.use(passport.session());

 
var users = [
    {username:'Khuram', password:'letme'},
    {username: 'Jhonny', password: 'dontyou'}
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

server.post('/createAccount' , function (req, res){
    var newUser = {email: req.body.userEmail, password: req.body.userPass}
    newUser.push(users)
    res.end("user added")
    // console.log("User Added")
})


// multer's config

var customConfig = multer.diskStorage({
    destination: function (req, file, next){
        next(null, './uploads')
    },
    filename: function (req,file,next){
        next(null, new Date() + '-' + file.originalname)
    }
})

var upload = multer({storage: customConfig})

// for multifiles.... where 10 is the limits of the files...
server.post('/pictures' , upload.array('pic' , 10), function ( req , res){
    res.send(upload.filename)
    // upload( req , res , err) => {
        //     if(err){
        //         res.render('index' , {
        //             msg: err
        //         });
        //     } else {
        //         if (req.file == undefined){
        //             res.render('index', {
        //                 msg: 'Err no file Selected'
        //             });
        //             else{
        //                 res.render('index' , {
        //                     msg: 'File Uploaded',
        //                     file: 'upload'
        //                 });
        //             }
        //         }
        //     }
        // }


    console.log(req.file)
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
        }else {
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