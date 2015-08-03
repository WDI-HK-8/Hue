var Bcrypt = require('bcrypt');
// var Auth = require('./auth'); // => import auth module

exports.register = function(server, options, next){
  server.route([
    {
      method: 'POST',
      path: '/sessions',
      handler: function(request, reply){
        //1. check if user doesn't exist in db, return false message
        var db = request.server.plugins['hapi-mongodb'].db;
        var user = request.payload.user;
        db.collection('users').findOne({email:user.email}, function(error, writeResult){
          if(error){return reply('Mongodb Error')};
          if(!writeResult){ //if can't find user email...
            return reply({authorized: false}); //'Sorry. You gotta sign up first before logging in.'
          }     
          //2. if user exists, check password - use Bcrypt compare
          Bcrypt.compare(user.password, writeResult.password, function(err, res){
            if(err){return reply('Bcrypt Error')};
            if(!res){ //if password is incorrect...
              return reply({authorized: false}); //'Sorry. Incorrect Password. Try again.'
            }   
            //3. create new session in the sessions collections
            var randomKeyGenerator = function() {
              return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
            };

            var session = {user_id: writeResult._id, session_id: randomKeyGenerator()};

            db.collection('sessions').insert(session, function(err, writeResult){
              if(err){return reply(err)};
              //set same session_id in the client's cookie
              request.session.set('huelist_session' , session);
              return reply({authenticated: true}); //'you are logged in.'
            }); 
          });
        });
      }
    }
  ]);
  next();
};

exports.register.attributes = {
  name: 'sessions-routes',
  version: '0.0.1'
}