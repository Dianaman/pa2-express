var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    database  : 'pa2',
    user     : 'root',
    password : ''
  });
  
  connection.connect();

  req.db = connection;

  next();
});

module.exports = router;