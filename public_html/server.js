/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var serverport = 8082;

var http = require('http');
var qs = require('querystring');
var url = require('url');
var fs = require('fs');
var util = require('util');
var mime = require('C:\\Users\\ANANT\\node_modules\\mime');
var vidStreamer = require("C:\\Users\\ANANT\\node_modules\\vid-streamer");
var request = require("C:\\Users\\ANANT\\node_modules\\request");
var mydb = require('./mydb');

var api_key = 'key-64e60f5a80bb177bea0d7635f61bf458';
var domain = 'sandbox59cc9c41762a4791a8797b63d04e1169.mailgun.org';
//var nodemailer = require("nodemailer");
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

mydb.connectDB();

var useremail;

// get getFilename from request using url
getFilename = function (req) {
    var filename = req.url.substring(1);
    if (!!filename)
        return filename;
    return "/";
};
sendFile = function (filename, res) {
    if (filename[filename.length - 1] === '/')
        filename += 'index.html';
    console.log('file: ' + filename);
    fs.readFile(filename, function (err, data) {
        if (err) {
            writeResult(res, "404", "Page not found!", "text/plain");
            return;
        }
//    console.log('file: ' + filename + ' mime : ' + mime.lookup(filename));    
        writeResult(res, 200, data, mime.lookup(filename));
    });
};
//server starts here
http.createServer(function (req, res) {
    if (req.method === 'GET') {
        handleGet(req, res);
    }
    else
    if (req.method === 'POST') {
        handlePost(req, res);
    }
}).listen(serverport);
util.log('A Simple Node Server is running...');

writeResult = function (res, code, result, mimetype) {
    res.writeHead(code, {'Content-Type': mimetype, 'Content-Length': result.length});
    res.write(result);
    res.end();
};
handlePost = function (req, res) {

    console.log("" + req.url);
    if (req.url === "/userinfoJSON") {
        util.log("inside register ---server");
        insertUserinfo(req, res);
    }
    else if (req.url === "/usersigninJSON") {

        util.log("inside user signin----server");
        signinfunction(req, res);
    }
    else if (req.url === "/verificationJSON") {
        util.log("inside user verfication----server");
        verificationfunction(req, res);
    }
    else if (req.url === "/passwordChangeJSON") {
        util.log("inside password change----server");
        passwordChangefunction(req, res);
    }
    else if (req.url === "/resetPassinfoJSON") {
        util.log("inside reset password----server");
        resetPasswordfunction(req, res);
    }
    else if (req.url.indexOf("cityInfoJSON") >= 0) {
        util.log("inside cityInfoJSON");
        cityInfofun(req, res);
    }
    else if (req.url.indexOf("saveInfoJSON") >= 0) {
        util.log("inside saveInfoJSON");
        saveInfofun(req, res);
    }
    else if (req.url.indexOf("/adminsigninJSON") >= 0) {
        util.log("inside adminsigninJSON");
        adminsigninfun(req, res);
    }
    else if (req.url.indexOf("/mailinfoJSON") >= 0) {
        util.log("inside mailinfoJSON");
        mailSendfun(req, res);
    }
    /////////////////////////////////
    //for download///////////////////
    else if (req.url.indexOf("/mailinfoJSON") >= 0) {
        util.log("inside mailinfoJSON");
        mailSendfun(req, res);
    }
    else if (req.url.indexOf("/attractionInfoJSON") >= 0) {
        util.log("inside download attraction");
        storeAttraction(req, res);
    }
};
////////////////////////////////////////////////////////////////////////
// send mail to user

mailSendfun = function (req, res) {
    var body = "";
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        var obj = JSON.parse(body);
        var data = {
            from: 'Mailgun Sandbox <postmaster@sandbox59cc9c41762a4791a8797b63d04e1169.mailgun.org>',
            to: obj.to,
            subject: obj.subject,
            text: obj.body
        };
        console.log(data);
        mailgun.messages().send(data, function (err, body) {

            if (err) {
                console.log(err.message);
                res.writeHead(500, {'content-type': 'application/json'});
                res.end(JSON.stringify({error: true}));
            }
            else {
                console.log(body);
                console.log("Message sent: ");
                res.writeHead(200, {'content-type': 'application/json'});
                res.end(JSON.stringify({success: true}));
            }
        });
    });
};
//////////////////////////////////////////////////////////////
//download attraction
storeAttraction = function(req, res){
var body = "";
req.on('data', function (data) {
body += data;
});
req.on('end', function () {
var obj = JSON.parse(body);
mydb.downloadAttraction(obj,res,handleDownloadAttraction);
});
};
handleDownloadAttraction=function(res){
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(JSON.stringify({success: true}));
};
//-------------------------------------------------------------
//sign in function
                signinfunction = function (req, res) {
                var body = "";
                        req.on('data', function (data) {
                        body += data;
                        });
                        req.on('end', function () {
                        var obj = JSON.parse(body);
                                console.log("inside signin");
                                mydb.checkCustomer(obj.eMail, obj.passwd, res, sendValidinfo);
                        });
                };
                sendValidinfo = function (err, res, valid) {
                console.log(valid.val);
                        if ((err) || (valid.val === 0)) {
                res.writeHead(500, {'content-type': 'application/json'});
                        res.end(JSON.stringify({error: true}));
                }
                else {

                res.writeHead(200, {'content-type': 'application/json'});
                        res.end(JSON.stringify({success: true}));
                }
                };
//-----------------------------------------------------
//register function
                insertUserinfo = function (req, res)
                {
                var body = "";
                        req.on('data', function (data) {
                        body += data;
                        });
                        req.on('end', function () {
                        var obj = JSON.parse(body);
                                console.log("inside");
                                mydb.insertCustomer(obj.eMail, obj.passwd, res, handleinsertUserinfo, req, handlesuccessUserInfo);
                        });
                };
                handleinsertUserinfo = function (err, res) {
                if (err) {
                util.log(err.message + 'insidehandle');
                        res.writeHead(500, {'content-type': 'application/json'});
                        res.end(JSON.stringify({error: true,
                                message: err.message}));
                }
                };
                handlesuccessUserInfo = function (res, email, req, rand){
                link = "http://" + req.headers.host + "/verifySign-in.html";
                        var data = {
                        from: 'Mailgun Sandbox <postmaster@sandbox59cc9c41762a4791a8797b63d04e1169.mailgun.org>',
                                to: email,
                                subject: "Please confirm your Email account on WiseVacation",
                                text: "Hello,Your verification code is " + rand.val + "\nPlease Click on the link to verify your email. " + link + " "
                        };
                        console.log(data);
                        mailgun.messages().send(data, function (error, body) {

                if (error) {
                console.log(error.message);
                        res.writeHead(500, {'content-type': 'application/json'});
                        res.end(JSON.stringify({error: true}));
                }
                else {
                console.log(body);
                        console.log("Message sent: ");
                        res.writeHead(200, {'content-type': 'application/json'});
                        res.end(JSON.stringify({success: true}));
                }
                });
                };
//-------------------------------
//verification...................
                verificationfunction = function(req, res){
                var body = "";
                        req.on('data', function (data) {
                        body += data;
                        });
                        req.on('end', function () {
                        var obj = JSON.parse(body);
                                console.log("inside verification");
                                mydb.checkVerification(obj.vcode, res, sendVerificationinfo);
                        });
                };
                sendVerificationinfo = function(err, res, num_rows){
                console.log(num_rows.val);
                        if ((err) || (num_rows.val === 0)) {
                res.writeHead(500, {'content-type': 'application/json'});
                        res.end(JSON.stringify({error: true}));
                }
                else {

                res.writeHead(200, {'content-type': 'application/json'});
                        res.end(JSON.stringify({success: true}));
                }
                };
//---------------------------------------
// password change
                passwordChangefunction = function(req, res){
                var body = "";
                        req.on('data', function (data) {
                        body += data;
                        });
                        req.on('end', function () {
                        var obj = JSON.parse(body);
                                console.log("inside verification");
                                mydb.passChange(obj.eMail, res, req, sendpassChangeStatus);
                        });
                };
                sendpassChangeStatus = function(err, res, req, num_rows, email){
                console.log(num_rows.val);
                        if ((err) || (num_rows.val === 0)) {
                res.writeHead(500, {'content-type': 'application/json'});
                        res.end(JSON.stringify({error: true}));
                }
                else {
                link = "http://" + req.headers.host + "/reset-password.html?email=" + email;
                        var data = {
                        from: 'Mailgun Sandbox <postmaster@sandbox59cc9c41762a4791a8797b63d04e1169.mailgun.org>',
                                to: email,
                                subject: "Change password WiseVacation",
                                html: "Please click on the link to reset your password at wisevacation.<a href='" + link + "'>Reset Password"
                        };
                        console.log(data);
                        mailgun.messages().send(data, function (error, body) {

                if (error) {
                console.log(error.message);
                        res.writeHead(500, {'content-type': 'application/json'});
                        res.end(JSON.stringify({error: true}));
                }
                else {
                console.log(body);
                        console.log("Message sent: ");
                        res.writeHead(200, {'content-type': 'application/json'});
                        res.end(JSON.stringify({success: true}));
                }
                });
                }
                };
//-----------------------------------------------
//Reset password function

                resetPasswordfunction = function(req, res){
                var body = "";
                        req.on('data', function (data) {
                        body += data;
                        });
                        req.on('end', function () {
                        var obj = JSON.parse(body);
                                console.log("inside reset password");
                                mydb.resetPass(obj.eMail, obj.passwd, res, resetPassServer);
                        });
                };
                resetPassServer = function(err, res, num_rows){
                console.log(num_rows.val);
                        if ((err) || (num_rows.val === 0)) {
                res.writeHead(500, {'content-type': 'application/json'});
                        res.end(JSON.stringify({error: true}));
                }
                else {

                res.writeHead(200, {'content-type': 'application/json'});
                        res.end(JSON.stringify({success: true}));
                }
                };
                //------------------------------------------------
                //cityInfofun user.js
                cityInfofun = function(req, res){
                var body = "";
                        req.on('data', function (data) {
                        body += data;
                        });
                        req.on('end', function () {
                        var obj = JSON.parse(body);
                                console.log("inside city info insert fun in server.js");
                                mydb.insertcityInfo(obj.email, obj.city, obj.category, res, handlecityInfofun);
                        });
                };
                handlecityInfofun = function(res){
                res.writeHead(200, {'content-type': 'application/json'});
                        res.end(JSON.stringify({success: true}));
                };
                //------------------------------------------------
                //saveInfofun user.js
                saveInfofun = function(req, res){
                var body = "";
                        req.on('data', function (data) {
                        body += data;
                        });
                        req.on('end', function () {
                        var obj = JSON.parse(body);
                                console.log("inside city info insert fun in server.js");
                                mydb.insertsaveInfo(obj.email, obj.city, obj.category, obj.key, obj.name, res, handlesaveInfofun);
                        });
                };
                handlesaveInfofun = function(res){
                res.writeHead(200, {'content-type': 'application/json'});
                        res.end(JSON.stringify({success: true}));
                };
                //------------------------------------------------
                handlesendEmail = function(res){
                res.writeHead(200, {'content-type': 'application/json'});
                        console.log(useremail);
                        res.end(JSON.stringify({email:useremail}));
                };
//--------------------------------------------------
//admin
                adminsigninfun = function(req, res){
                var body = "";
                        req.on('data', function (data) {
                        body += data;
                        });
                        req.on('end', function () {
                        var obj = JSON.parse(body);
                                console.log("inside admin signin fun in server.js");
                                mydb.adminsignin(obj.id, obj.passwd, res, handleAdminsign);
                        });
                };
                handleAdminsign = function (err, res, valid) {

                if ((err) || (valid.val === 0)) {
                res.writeHead(500, {'content-type': 'application/json'});
                        res.end(JSON.stringify({error: true}));
                }
                else {

                res.writeHead(200, {'content-type': 'application/json'});
                        res.end(JSON.stringify({success: true}));
                }
                };
//---------------------------------------------
//get request for saved trips

                getsavedHandle = function(res, users){
                res.writeHead(200, {"Content-Type": "text/html"});
                        var content = '{"users":' + JSON.stringify(users) + '}\n';
                        res.end(content);
                        util.log(content);
                };
//-------------------------------------------------
//handleGetVisitors for admin
                handleGetVisitors = function(res, users){
                res.writeHead(200, {"Content-Type": "text/html"});
                        var content = '{"users":' + JSON.stringify(users) + '}\n';
                        res.end(content);
                        util.log(content);
                }
//get request function
        handleGet = function (req, res) {
        var filename = getFilename(req).replace(/%20/g, " ");
                if (req.url === "/") {
        writeResult(res, "200", "A Simple Server says: Hello!", "text/plain");
        }
        else if (req.url.indexOf("/resources/video") >= 0
                || req.url.indexOf("/resources/audio") >= 0) {
        vidStreamer(req, res);
        }
        else if (req.url.indexOf("reset-password.html") >= 0){
        var pos = req.url.indexOf("=");
                var len = req.url.length;
                var data = req.url.substring(pos + 1, len);
                util.log(data);
                useremail = data;
                sendFile("reset-password.html", res);
        }
        else if (req.url.indexOf("getEmail") >= 0){
        handlesendEmail(res);
        }
        else if (req.url.indexOf("getSavedTrips") >= 0){
        console.log(req.url);
                var pos1 = req.url.indexOf(":");
                var pos2 = req.url.indexOf("}");
                var data = req.url.substring(pos1 + 4, pos2 - 3);
                console.log(data);
                mydb.getsavedInfo(data, res, getsavedHandle);
        }
        else if (req.url.indexOf("getVisitorLists") >= 0){
        mydb.getVisitors(res, handleGetVisitors);
        }
        else sendFile(filename, res);
        };


