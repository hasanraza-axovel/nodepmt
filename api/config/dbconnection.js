var mysql = require('mysql');

var connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'pmt'
});

 module.exports = connection;
