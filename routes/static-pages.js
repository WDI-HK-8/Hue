//static resources/assets for the site
//link registry point to index.js, where it is 'plugged in'
exports.register = function(server, options, next){
  server.route([
    {//linked to view index.html
      method:'GET',
      path:'/',
      handler: function(request, reply){
        reply.view('index');
      }  
    },
    {//linked to projects.html
      method:'GET',
      path:'/users/{user_id}/projects',
      handler: function(request, reply){
        request.params.user_id;
        if(request.session.get('huelist_session')){
          reply.view('projects');
        }
        else{
          return reply('You need to sign in');
        }
      } 
    },
    {//linked to colors.html
      method:'GET',
      path:'/project/colors',
      handler: function(request, reply){
        if(request.session.get('huelist_session')){
          reply.view('colors');
        }
        else{
          return reply('You need to sign in');
        }
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