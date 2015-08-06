exports.register = function(server, option, next){
  server.route([
    {
      method:'POST',
      path:'/colors/create', //@application3
      handler: function(request, reply){
        var db           = request.server.plugins['hapi-mongodb'].db;
        var ObjectId     = request.server.plugins['hapi-mongodb'].ObjectID;
        var user_session = request.session.get('huelist_session');
        var data         = request.payload;

        //construct update document
        var color_doc = {};
        color_doc[data.color_hex] = data.color_list;

        db.collection('projects').update(
          {$and:[ //check for both these fields ()
              {name: data.project_name},
              {user_id: user_session.user_id}
            ]
          },
          {$push: { //push to a colors array, 
              colors: {$exists: true},
              colors: color_doc
            }
          }, //fieldToAppend: AppendData
          {upsert:false},
          function(err, writeResult){
            if(err){return reply(err);};
            return reply(writeResult);
          }
        );
      }
    },
    {
      method:'GET',
      path:'/colors/get',
      handler: function(request, reply){
        var db           = request.server.plugins['hapi-mongodb'].db;
        var ObjectId     = request.server.plugins['hapi-mongodb'].ObjectID;
        var user_session = request.session.get('huelist_session');
        var project_name = request.query.keyword;
        //get the color keys inside colors field of projects collection, referencing user_id and name filters
        db.collection('projects').find(
          {$and:[ //query both these fields 
              {name: project_name},
              {user_id: user_session.user_id}
            ]
          },
          {colors:true}, //projection - show this only
          function(err, writeResult){
            if(err){return reply(err);};
            return reply(writeResult.toArray());
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