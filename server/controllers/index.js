var db = require('../db');
var bluebird = require('bluebird');


module.exports = {
  messages: {
    get: function (req, res) {
      db.Message.findAll({include: [db.User]})
        .complete(function(err, result){
          res.json(result);
        });
      // models.messages.get(function(rows){
      //   res.json(rows);
      // });

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      db.User.findOrCreate({where: {username: req.body.username}})
        .complete(function(err, results){
          // [{"userid":10,"username":"rawr3"},true]

          db.Message.create({
            userid: results[0].dataValues.userid,
            message: req.body.message,
            roomname: req.body.roomname
          }).complete(function(){
            res.sendStatus(201);
          });
        });



      // var username = req.body.username || '';
      // var message = req.body.message || '';
      // var roomname = req.body.roomname || '';

      // models.messages.post([username, message, roomname], function (){
      //   res.end();
      // });

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // models.users.get(function(rows){
      //   res.json(rows);
      // });
      db.User.findAll()
        .complete(function(err, results){
          res.json(results);
        });
    },
    post: function (req, res) {
      db.User.create({
        username: req.body.username
      }).complete(function(){
        res.sendStatus(201);
      });

      // var username = req.params.username;
      // var username = req.body.username;
      // models.users.post([username], function(){
      //   res.end();
      // });

    }
  }
};

