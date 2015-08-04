var Bcrypt = require('bcrypt');
var Auth = require('./auth'); // => import auth plugin/module

exports.register = function(server, options, next){
  server.route([
    //LOG IN - SETS NEW SESSION OBJECT
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
            return reply({authorized: false}); 
          }     
          //2. if user exists, check password - use Bcrypt compare
          Bcrypt.compare(user.password, writeResult.password, function(err, res){
            if(err){return reply('Bcrypt Error')};
            if(!res){ //if password is incorrect...
              return reply({authorized: false}); 
            }   
            //3. create new session in the sessions collections
            var randomKeyGenerator = function() {
              return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
            };

            var session = { //CREATE COOKIE
              user_id: writeResult._id, 
              session_id: randomKeyGenerator()
            };

            db.collection('sessions').insert(session, function(err, writeResult){
              if(err){return reply(err)};
              //set same session_id in the client's cookie
              request.session.set('huelist_session' , session);
              return reply({authenticated: true, user_id: session.user_id}); //'you are logged in.'
            }); 
          });
        });
      }
    },
    //LOGGED-IN AUTH CHECK. USE THIS ON EACH USER TASK (all user actions require a logged in status, as it saves the 'state' of each task)
    {
      method:'GET',
      path:'/authenticated',
      handler:function(request, reply){
        var callback = function(result){ reply(result); } 
        Auth.authenticated(request, callback);
      }
    },
    {//DELETE AUTHENTICATION. SIGN OUT.
      method:'DELETE',
      path:'/sessions',
      handler:function(request, reply){
        var db = request.server.plugins['hapi-mongodb'].db;
        var cookie = request.session.get('huelist_session');
        if(!cookie){return reply({cookie:false});}
        db.collection('sessions').remove({session_id: cookie.session_id}, function(err, writeResult){

          return reply(writeResult);
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