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

var orm = new Sequelize("chat", "root", "");

var User = orm.define('user', {
  userid: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: Sequelize.STRING
}, {
  timestamps: false
});

var Message = orm.define('message', {
  messageid: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  message: Sequelize.STRING,
  roomname: Sequelize.STRING
}, {
  timestamps: false
});

User.hasMany(Message, {foreignKey: 'userid'});
Message.belongsTo(User, {foreignKey: 'userid'});

User.sync();
Message.sync();

exports.User = User;
exports.Message = Message;


