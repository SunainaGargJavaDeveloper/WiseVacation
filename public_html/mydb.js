/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mysql = require('C:\\Users\\ANANT\\node_modules\\mysql');
var util = require('util');

module.exports = {
    connection: null,
    // Create a database connection
    connectDB: function () {
        var connectionConfig = {
            host: 'localhost',
            user: 'root',
            password: 'ab12',
            database: 'wisevacation',
            charset:'utf8mb4_unicode_ci'
        };
        connection = mysql.createConnection(connectionConfig);
        util.log('connection::connecting...');
        connection.connect(function (err) {
            util.log('connection::connected');
        });
    },
    //----------------------------------------------------------------------------------
    //register function
    insertCustomer: function (email, password, res, callback, req, callback2)
    {
        var bool = "false";
        var user = {email: email, password: password, valid: bool};

        connection.query('insert into visitor Set?', user, function (err, results) {

            if (err) {
                util.log("inside register error" + err.message);
                callback(err, res);
                return;
            }
            else {
                util.log('insertUser: ');
                connection.query("select random from visitor where email='" + email + "'", function (err, rows, results) {
                    var rand = {val: 0};
                    if (err)
                        util.log("inside random num error" + err.message);
                    else {
                        util.log("inside random no");
                        rand = {val: rows[0].random};
                        util.log('val ' + rand.val);
                    }
                    callback2(res, email, req, rand);
                    return;
                });

            }

        });
    },
    //------------------------------------------------------------------------
    //sign in function
    checkCustomer: function (email, password, res, callback) {

        connection.query("select count(*)as num_rows from visitor where email='" + email + "' and password='" + password + "'and valid='true'", function (err, rows, results) {
            var valid;
            if (err)
                util.log("inside sign in error" + err.message);
            else {
                util.log("inside sign in");
                valid = {val: rows[0].num_rows};
                util.log('valid: ' + valid.val);
            }
            callback(err, res, valid);
        });
    },
    //------------------------------------------------------------------------------
    //verification function
    checkVerification: function (vcode, res, callback) {
        connection.query("update visitor set valid='true'where valid='false' and random=" + vcode, function (err, result) {
            var num_rows;
            if (err)
                util.log("inside verification error" + err.message);
            else {
                util.log("inside verification----mydb.js");
                num_rows = {val: result.changedRows};
                util.log('verification: ' + num_rows.val);
            }
            callback(err, res, num_rows);
        });
    },
    //-----------------------------------------------------------------------
    //passwordChange
    passChange: function (email, res, req, callback) {
        connection.query("select count(*)as num_rows from visitor where email='" + email + "'", function (error, rows, result) {
            var num_rows;
            if (error)
                util.log("inside changepassword error" + error.message);
            else
            {
                util.log("inside passwordchange---------- db.js");
                num_rows = {val: rows[0].num_rows};
                util.log('change pass: ' + num_rows.val);

            }
            callback(error, res, req, num_rows, email);
        });
    },
    //---------------------------------------------------------------------------
    //reset password
    resetPass: function (email, password, res, callback) {
        connection.query("update visitor set password='" + password + "' where email='" + email + "'", function (error, result) {
            var num_rows;
            if (error)
                util.log("inside reset password error" + error.message);
            else {
                util.log("inside reset password-----mydb.js");
                num_rows = {val: result.changedRows};
                util.log('reset password changed rows: ' + num_rows.val);
            }
            callback(error, res, num_rows);
        });
    },
    //--------------------------------------------------------------------------------
    //user.js city info
    insertcityInfo: function (email, city, category, res, callback) {
        connection.query("insert into UserSearch(email,category,city) values ('" + email + "','" + category + "','" + city + "')", function (err, result) {
            if (err)
                util.log(err.message);
            else {
                util.log("done with insert in user search");
                callback(res);
            }
        });
    },
    //--------------------------------------------------------------------------------
    //user.js city info
    insertsaveInfo: function (email, city, category, key, name, res, callback) {
        connection.query("insert into UserSearch(email,category,city,categorykey,categoryName) values ('" + email + "','" + category + "','" + city + "','" + key + "','" + name + "')", function (err, result) {
            if (err)
                util.log(err.message);
            else {
                util.log("done with insertSave in usersearch");
                callback(res);
            }
        });
    },
    ///-------------------------------------------------------------
    getsavedInfo: function (email, res, callback) {
        connection.query("select distinct * from UserSearch where email='" + email + "'", function (err, rows, fields) {
            if (err)
                console.log("inside getSavedInfo err" + err.message);
            else {
                var users = [];
                rows.forEach(function (row) {
                    var user = {category: row.category, city: row.city, categorykey: row.categorykey, categoryName: row.categoryName};
                    users.push(user);
                });
                util.log("inside getsavedInfo result");
                callback(res, users);
            }

        });
    },
    ///---------------------------------------------------------------------
    //admin sign in
    adminsignin: function (id, password, res, callback) {

        connection.query("select count(*)as num_rows from admin where userid='" + id + "' and userpassword='" + password + "'", function (err, rows, results) {
            var valid;
            if (err)
                util.log("inside sign in error" + err.message);
            else {
                util.log("inside sign in");
                valid = {val: rows[0].num_rows};
                util.log('valid: ' + valid.val);
            }
            callback(err, res, valid);
        });
    },
    //-----------------------------------------------------------------------------
    //admin getVISITORS
    getVisitors: function (res, callback) {
        connection.query("select email from visitor", function (err, rows, result) {
            if (err)
                console.log("inside getVisitors db.js err" + err.message);
            else {
                var users = [];
                rows.forEach(function (row) {
                    var user = {email: row.email};
                    users.push(user);
                });
                util.log("inside getsavedInfo result");
                callback(res, users);
            }

        });
    },
    /////////////////////////////////////////////////////////////
    //download attraction
    downloadAttraction: function (obj, res, callback) {
        var str = 'insert into attraction (city,attractionId,attractionName) values ';
        var i = 0;

        for (; i < obj.length - 1; i++) {
           if(obj[i].id===201872)
               continue;
           console.log(obj[i].id);
            if (obj[i].name.indexOf("'") >= 0) {
              if(obj[i].name.indexOf('"') >= 0) {
                  var strAttracton=obj[i].name.replace("'","''");
                  console.log(strAttracton);
                  str += '("Tuscany","' + obj[i].id + '",' + "'" + strAttracton + "'),";
              } 
              else {
                str += '("Tuscany","' + obj[i].id + '","' + obj[i].name + '"),';
            }
            }
            else
                str += '("Tuscany","' + obj[i].id + '",' + "'" + obj[i].name + "'),";
        }
            
        if (obj[i].name.indexOf("'") >= 0) {
            str += '("Tuscany","' + obj[i].id + '","' + obj[i].name + '");';

        }
        else
            str += '("Tuscany","' + obj[i].id + '",' + "'" + obj[i].name + "');";
    
        //console.log(str);
        connection.query(str, function (err, result) {
            if (err) {
                util.log(err.message);

            }
            else {
                util.log("done with insert in attraction");
                callback(res);
            }
        });
    }

};



