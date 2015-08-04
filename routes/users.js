//user signups
var Bcrypt = require('bcrypt');
var Joi = require('joi');

//link registry point to index.js, where it is 'plugged in'
exports.register = function(server, options, next){
  server.route([
    { //CREATE USER
      method:'POST',
      path:'/users',
      handler: function(request, reply){ //returns one of each
        
        var db = request.server.plugins['hapi-mongodb'].db;
        var user = request.payload.user;
        var uniqueUser = {email: user.email};
        var samePwd = (user.password === user.confirm_password);

        db.collection('users').count(uniqueUser,function(err, writeResult){
          //if such a user email exist or passwords are identical...
          if(writeResult){ return reply('User already exists!');}
          else if(!samePwd){ return reply('Please check if your passwords are the same!');}  
          //if not, encrypt the password...
          Bcrypt.genSalt(10, function(err, salt) {
              Bcrypt.hash(user.password, salt, function(err, hash) {
                user.password = hash;
                user.confirm_password = true;
                //add new user into collection users...
                db.collection('users').insert(user, function(err, writeResult){
                  reply(uniqueUser,' was registered.');
                });
              });
          });
        });
      },
      // validate:{ //Joi form validation, alias for "request"?
      //   payload:{
      //     user: {
      //       email: Joi.string().email().max(50).required(),
      //       password: Joi.string().min(5).max(20).required()
      //     }
      //   }
      // }
    }
  ]);

  next();
}

exports.register.attributes = {
  name: 'users-routes',
  version: '0.0.1'
};