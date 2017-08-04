var connection = require('../config/dbconnection');
var express = require('express');
var router = express.Router();
router.post('/createProjlabel', function(req, res) {
  var input = JSON.parse(JSON.stringify(req.body));
    var data = {
      labelName: input.labelName,
      proj_id:  input.proj_id,
    };
    // console.log(data);
    // res.send({"resp":"curret"});
    var qry="INSERT INTO projlabel(labelName, proj_id) VALUES ? ";
    var values=[[data.labelName, data.proj_id]];
    connection.query(qry, [values], function(err, result){
      if(err){
        res.send({"resp":"database error"});
      }
      else{
        res.send({"resp":"data saved into database"})
      }
    });
});

router.get('/getProjlabel/:projId', function(req, res) {
  var input = JSON.parse(JSON.stringify(req.body));
  var projId = req.params.projId;
  var qry = "SELECT * FROM projlabel WHERE proj_id = ?";
  console.log(projId);
  connection.query(qry, projId, function(err, result) {
    if(err) {
      res.send({"resp": "database error"});
    }
    else {
      res.send(result);
    }
  });
});
  module.exports = router;
