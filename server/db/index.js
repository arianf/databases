var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

// var connection = mysql.createConnection({
//   host : 'localhost',
//   user: 'root',
//   password: '',
//   database: 'chat'
// });

// connection.connect();
var Sequelize = require("sequelize");

module.exports.sequelize = new Sequelize("chat", "root", "");

module.exports.User = module.exports.sequelize.define('User', {
  userid: Sequelize.INTEGER,
  username: Sequelize.STRING
});

module.exports.Message = module.exports.sequelize.define('Message', {
  messageid: Sequelize.INTEGER,
  userid: Sequelize.INTEGER,
  message: Sequelize.STRING,
  roomname: Sequelize.STRING
});
