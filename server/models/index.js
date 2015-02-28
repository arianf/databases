var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT messages.messageid, users.username, messages.message, messages.roomname FROM messages INNER JOIN users on users.userid = messages.userid', function(err, rows, fields){
        if (err){ throw err; }
        callback(rows);
      });

    }, // a function which produces all the messages
    post: function (args, completed) {

      db.query('SELECT userid FROM users WHERE username = ?', [args[0]], function(err, rows){
        var userid;
        if(rows[0] === undefined){
          userid ='';
        }else{
          userid = rows[0].userid;
        }

        // replacing username with userid

        // check to see if usernname === ''
        if(args[0] === ''){
          console.log('cant find username');
          completed();
        }else{

          // username was something, but didn't exists in database
          if(userid === ''){
            module.exports.users.post([args[0]], function(result){
              args[0] = result.insertId;
              db.query('INSERT INTO messages (userid, message, roomname) VALUES ( ?, ?, ?)', args, function(err){
                if(err){
                  console.log('| failed insert message |');
                }else {
                  console.log('| inserted message |');
                }
                completed();
              });
            });
          }else{
            args[0] = userid;
            db.query('INSERT INTO messages (userid, message, roomname) VALUES ( ?, ?, ?)', args, function(err){
              if(err){
                console.log('| failed insert message |');
              }else {
                console.log('| inserted message |');
              }
              completed();
            });
          }

          //

        }

      });

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.query('SELECT * FROM users', function (err, rows){
        if (err){ throw err; }
        callback(rows);
      });
    },
    post: function (args, completed) {
      this.get(function(rows){

        var exists = false;
        rows.forEach(function(object){
          if(object.username === args[0]){
            exists = true;
          }
        });

        if(!exists){
          db.query('INSERT INTO users (username) VALUES (?)', args, function(err, result){
            if(err){
              console.log('| failed insert user | ');
            }else{
              console.log('| inserted user |');
            }
            completed(result);
          });
        }else{
          console.log('user already exists');
          completed();
        }
      });


    }
  }
};



// Table: users
// ---------------
// userid
// username

// | userid | username
// --------------------
// |    1   | arian

// --------------------------------------------------------



// Table: messages
// ---------------
// messageid
// userid
// message
// roomname

// messageid | userid | message | roomname
// ----------------------------------------
//     1     |    1   | hello   | main
//     2     |    1   | world   | main
//     3     |    2   | hiiii   |


// COMBINED
//
// messageid | username | message | roomname
// ----------------------------------------
//     1     |  arian   | hello   | main
//     2     |  arian   | world   | main
//




