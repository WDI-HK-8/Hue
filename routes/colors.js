exports.register = function(server, option, next){
  server.route([
    {
      method:'POST',
      path:'/colors/create', 
      handler: function(request, reply){
        var db           = request.server.plugins['hapi-mongodb'].db;
        var ObjectId     = request.server.plugins['hapi-mongodb'].ObjectID;
        var user_session = request.session.get('huelist_session');
        var data   = request.payload;

        //construct update document
        var color_data = data;
        console.log(color_data);
        var project_name = {};
        project_name[color_data.project_name] = color_data;
        console.log(project_name);

        db.collection('users').update(

          {_id: ObjectId(user_session.user_id)},

          {$push: project_name
          }, //fieldToAppend: AppendData
          {upsert:true},
          function(err, writeResult){
            if(err){return reply(err);};
            return reply(writeResult);
          }
        );
      }
    }
  ]);
  next();
};

exports.register.attributes = {
  name: 'colors-routes',
  version: '0.0.1'
}