var models = require('../models');
var bluebird = require('bluebird');


module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(rows){
        res.json(rows);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var username = req.body.username || '';
      var message = req.body.message || '';
      var roomname = req.body.roomname || '';

      models.messages.post([username, message, roomname], function (){
        res.end();
      });

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(function(rows){
        res.json(rows);
      });
    },
    post: function (req, res) {

      var username = req.params.username;
      var username = req.body.username;
      models.users.post([username], function(){
        res.end();
      });

    }
  }
};

