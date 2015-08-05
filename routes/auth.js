// exports to the 'require'(argument) for this file name path
module.exports = {};

//aka Auth.authenticated
module.exports.authenticated = function(request, callback){
  //1. retrieve session_id from cookie
  var msg = 'Unauthorized access detected.';
  var cookie = request.session.get('huelist_session');
  if(!cookie){return callback({authenticated:false, message: msg});}
  
  //2. look into the DB to find matching session_id
  var db = request.server.plugins['hapi-mongo'].db;
  db.collection('sessions').findOne({session_id: cookie.session_id}, function(err, writeResult){
    if(err){return callback('Mongodb Error')};
    //3, return true / false
    if(!writeResult){return callback({authenticated:false, message: msg});}
    return callback({authenticated:true, user_id: cookie.user_id});
  });
 
}