//user signups
var Bcrypt = require('bcrypt');
var Joi = require('joi');

//link registry point to index.js, where it is 'plugged in'
exports.register = function(server, options, next){
  server.route([
    { //setup server to expect a POST Request...
      method:'POST',
      path:'/users',
      handler: function(request, reply){ //returns one of each
        reply(request.payload);
        
      }
    }
  ]);

  next();
}

exports.register.attributes = {
  name: 'users-routes',
  version: '0.0.1'
};