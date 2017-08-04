var connection = require('../config/dbconnection');
var express = require('express');
var router = express.Router();

router.post('/register', function(req, res) {
  var input = JSON.parse(JSON.stringify(req.body));
  var data = {
    username : input.username,
    email : input.email,
    password : input.password,
  };
  var qury = "SELECT username, email FROM user WHERE ?";
      var one = 1;
      var userMsg;
      var emailMsg;
      connection.query(qury, one, function(err1, rows) {
        if(err1) {
          res.send({'resp': 'Database error occured'});
        }
        else {
          for(var i=0; i<rows.length; i++) {
            if(data.username == rows[i].username) {
              userMsg = "username already exist";
              break;
            }
            else if(data.email == rows[i].email) {
              emailMsg = "email already exist";
              break;
            }
          }
          if(i < rows.length) {
            res.send({"username":userMsg,"email":emailMsg});
          }
          else {
            var qry = "INSERT INTO user(username, email, password) VALUES ?";
            var values = [[data.username, data.email, data.password]];
            connection.query(qry, [values], function(err, result) {
              if(err) {
                res.send({"resp": "database error"});
              }
              else {
                res.send({"status": "data saved into database"});
              }
            });
          }
        }
      });
});


router.post('/login', function(req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
      var qry = "SELECT * FROM user WHERE email = ?";
      console.log(input.email);
      connection.query(qry, [input.email], function(err, rows) {
        if(err) {
          res.send({'error':'An error occured'});
        }
        else {
          if(rows.length==0){
            res.send({"error":"email does not exist"});
          }
          else if(input.password == rows[0].password) {
            res.send({"id":rows[0].id, "email":rows[0].email, "username":rows[0].username, "password":rows[0].password});
          }
          else {
            res.send({"error":"password is wrong"});
          }
        }
      });
  });

module.exports = router;
