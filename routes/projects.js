//Color scheme & Project Management
var Joi = require('joi');

exports.register = function(server, option, next){
  server.route([
    {//gets all colors from project
      method:'GET',
      path:'/projects',
      handler: function(request, reply){
        //NEEDS COOKIE TO CHECK FOR USERS
        var db = request.server.plugins['hapi-mongodb'].db;
        var all_projects = {request: projects};
        db.collection('users').find(all_projects, function(err, writeResult){
            if(err){ 
              return reply('Mongodb error'); 
            }
        });
      }
    }
  ]);
  next();
};

exports.register.attributes = {
  name: 'projects-routes',
  version: '0.0.1'
}