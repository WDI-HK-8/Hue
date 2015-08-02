//static resources/assets for the site

exports.register = function(server, options, next){
  server.route([
    {
      method:'GET',
      path:'/',
      handler: function(request, reply){
        reply.view('index');
      }  
    },
    {//linked assets via html
      method:'GET',
      path:'/public/{path*}', 
      handler: {
        directory: {
          path: 'public'
        }
      }  
    },
    {//linked bower libraries via html
      method:'GET',
      path:'/bower_components/{path*}', 
      handler: {
        directory: {
          path: 'bower_components'
        }
      }  
    }
  ]);

  next();
}

exports.register.attributes = {
  name: 'static-pages-route',
  version: '0.0.1'
};