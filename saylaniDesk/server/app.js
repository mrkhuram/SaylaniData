const express = require('express');
var server = express();
var fs = require('fs');
server.use(express.static("static"));
var multer = require("multer")


// multer's config

var customConfig = multer.diskStorage({
    destination: function (req, file, next){
        next(null, './uploads')
    },
    filename: function (req,file,next){
        var name = file.originalname
        next(null, Math.random() + '-' + name)
    }
})
 
var upload = multer({storage: customConfig})

// for multifiles.... where 10 is the limits of the files...
server.post('/pictures' , upload.array('pic' , 10), function ( req,res){
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