//Color scheme & Project Management
var Joi = require('joi');

exports.register = function(server, option, next){
  server.route([
    {//Responds to adding new projects
      method:'POST',
      path:'/projects',
      handler: function(request, reply){
        //NEEDS COOKIE TO CHECK FOR USERS

        var db = request.server.plugins['hapi-mongodb'].db;
        //get user_id from current session
        var user_session = request.session.get('huelist_session');
        //find the user object with the same session_id, then modify it
        db.collection('users').update(
          {user: user_session.user_id},
          {
            project: request.payload.project.name,
          },
          {upsert:true}
        );
      }
    }
  ]);
  next();
};

exports.register.attributes = {
  name: 'projects-routes',
  version: '0.0.1'
}