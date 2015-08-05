//Color scheme & Project Management
var Joi = require('joi');

exports.register = function(server, option, next){
  server.route([ 
    {//Responds to retrieving all new projects of user
      method:'GET',
      path:'/projects',
      handler: function(request, reply){

        var db = request.server.plugins['hapi-mongodb'].db;
        var ObjectId = request.server.plugins['hapi-mongodb'].ObjectID;
        //get user_id from current session
        var user_session = request.session.get('huelist_session');
        //init document 'projects' of a document, return if exists
        //find the user object with the same user_id
        db.collection('users').find( 
          {_id: ObjectId(user_session.user_id)}, //criteria 
          {projects:[]}, //fields
          function(err, writeResult){ //callback
            if(err){return reply(err);};
            return reply(writeResult.toArray());
          }
        );
      }
    },
    {//Responds to posting a new project
      method:'POST',
      path:'/projects',
      handler: function(request, reply){
        var db = request.server.plugins['hapi-mongodb'].db;
        var ObjectId = request.server.plugins['hapi-mongodb'].ObjectID;
        var project_name = request.payload.project_name;
        var user_session = request.session.get('huelist_session');
        
        //Reconstruct dynamic key document
        var project_file = {};
        project_file[project_name] = [];

        //LATER: If current project don't have the same name as project_name...
        db.collection('users').update(
          {_id: ObjectId(user_session.user_id)}, //criteria
          {$push: { //update 
            projects:project_file 
            } 
          }, 
          {upsert:true}, //options
          function(err, writeResult){
            if(err){return reply(err);};
            return reply(request.payload);
          }
        );
      }
    },
    // {//Editing colors and definitions
    //   method:'PUT',
    //   path: ''
    // }
  ]);
  next();
};

exports.register.attributes = {
  name: 'projects-routes',
  version: '0.0.1'
}