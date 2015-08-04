// import hapi library as class
var Hapi = require('hapi');

//instantiate hapi server via class, listen for port 3000 connection
var server = new Hapi.Server();

//configure server connection, with [options object]
server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 3000,
  routes: {
    cors: { //enables cross-origin data sharing
      headers: ['Access-Control-Allow-Credentials'], 
      credentials: true
    }
  }
});

//import class Path, file paths module.
var Path = require('path');
//setup server views mgr to render html files
server.views({
  engines:{ //mapped npm module handlebars for rendering the templates, incl. index.html
    html: require('handlebars')
  },
  //__dirname is local string object of all node modules
  path: Path.join(__dirname, 'templates')
});

// ---------ROUTES & PLUGINS---------
var plugins = [
  // {register: require('./routes/projects.js')},
  {register: require('./routes/sessions.js')},
  {register: require('./routes/users.js')},
  {register: require('./routes/static-pages.js')},
  { //add hapi-mongodb plugin
    register: require('hapi-mongodb'),
    options: {
      url: process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/hue',
      settings:{
        db:{
          native_parser: false
        }
      }
    }
  },
  { //add yar plugin, for cookies
    register: require('yar'),
    options:{
      cookieOptions: {
        password: process.env.COOKIE_PASSWORD || 'asdasdasd',
        isSecure: false //we are not going to https, yet, for dev
      }
    }
  }
];
// -----------SERVER RUN------------
//register/load server with plugins and callback
server.register(plugins, function(err){
  if(err){throw err;} //display plugin error
  
  //if no plugin errors, start server
  server.start(function(){
    console.log('Server running at: ' + server.info.uri);
  });
});
