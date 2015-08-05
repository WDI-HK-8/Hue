exports.register = function(server, option, next){
  server.route([
    {
      method:'POST',
      path:'/colors/create', 
      handler: function(request, reply){

      }
    }
  ]);
  next();
};

exports.register.attributes = {
  name: 'colors-routes',
  version: '0.0.1'
}