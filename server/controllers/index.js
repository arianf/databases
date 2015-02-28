var models = require('../models');
var bluebird = require('bluebird');
var queryString = require('querystring');


module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(rows){
        res.end(JSON.stringify(rows));
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // req.body
      // var body = '';
      // req.on('data', function (data){
      //   body += data;
      // });
      // req.on('end', function (){
      console.log(req.body);
        // var username = queryString.parse(body).username;
        var username = req.body.username || '';
        // var message = queryString.parse(body).message || '';
        var message = req.body.message || '';
        // var roomname = queryString.parse(body).roomname || '';
        var roomname = req.body.roomname || '';
        models.messages.post([username, message, roomname], function (){
          res.end();
        });
      // });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(function(rows){
        res.end(JSON.stringify(rows));
      });
    },
    post: function (req, res) {

      //---- works for curl ------
      // req.writeHead(201, {'Content-Type': 'application/json'});
      // var body = '';
      // req.on('data', function (data){
      //   body += data;
      // });

      // req.on('end', function (){

      //   var username = queryString.parse(body).username || '';

      //   models.users.post([username], function(){
      //     console.log("I ADDED IT");
      //     res.end();
      //   });
      // });

      // var username = req.body.username || '';

      //---- works for test ------
      var username = req.params.username; //('username', 'cant find');
      var username = req.body.username;
      models.users.post([username], function(){
        res.end();
      });



    }
  }
};

