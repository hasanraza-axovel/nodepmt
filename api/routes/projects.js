var connection = require('../config/dbconnection');
var express = require('express');
var router = express.Router();

router.post('/createProj', function(req, res) {
  var input = JSON.parse(JSON.stringify(req.body));
  var data = {
    projName : input.projName,
    user_id :  input.user_id
  };

  var qry = "INSERT INTO userProj(projName, user_id) VALUES ? ";
  var values = [[data.projName, data.user_id]];
  connection.query(qry, [values], function(err, result) {
    if(err) {
      res.send({"resp": "database error"});
    }
    else{
      res.send({"resp": "data saved into databse"});
    }
  });
});

router.get('/getProj/:Userid', function(req, res) {
  var Userid = req.params.Userid;
  var qry = "SELECT * FROM userProj WHERE user_id= ? ";
  connection.query(qry, Userid, function(err, result){
    if(err) {
      res.send({"resp": "database error"});
    }
    else {
      res.send(result);
    }
  });
});

router.get('/getAProj/:id', function(req, res) {
  var id = req.params.id;
  var qry = "SELECT * FROM userProj WHERE id = ?";
  connection.query(qry, id, function(err, result) {
    if(err) {
      res.send({"resp": "database error"});
    }
    else {
      res.send({"id":result[0].id,
      "dt_created":result[0].dt_created,
      "dt_updated":result[0].dt_updated,
      "user_id":result[0].user_id,
      "projName":result[0].projName});
    }
  });
});

module.exports = router;
