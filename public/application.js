//Class Constructor
var Hue = function(){
  this.user = 'somebody';
}
var hue = new Hue();

//Class Methods
Hue.prototype.signup_user = function() {
  $.ajax({
    url: '/users',
    type: 'POST',
    dataType: 'JSON',
    data:{
      user: { //insert template user object
        email: $('#signup_email').val(),
        password: $('#signup_password').val(),
        confirm_password: $('#confirm_signup_password').val() 
      } 
    },
    success:function(response){
      console.log(response);
      $('#myModal').modal('toggle');
    },
    error:function(error){
      console.log(error);
    }
  });
};

Hue.prototype.signin_user = function() {
  $.ajax({
    url: '/sessions',
    type: 'POST',
    dataType: 'JSON',
    data:{
      user: { //send a user object with email and password for validation
        email: $('#signin_email').val(),
        password: $('#signin_password').val()
      } 
    },
    success:function(response){ 
      //change page to projects page on successful log in

      //create table for project listings

      //get sends a 'get' request to fetch project listing
      console.log(response);
      if(response.authenticated === true){
        $('.container').html('YOU ARE SIGNED IN.');
      }
    },
    error:function(error){
      console.log(error);
    }
  });
};

Hue.prototype.auth = function(){
  $.ajax({
    url: '/authenticated',
    type: 'GET',
    dataType: 'JSON',
    success: function(response){
      console.log(response); //auth result
    },
    error: function(error){
      console.log(error); //auth error
    }
  });
};

//DOM ready
$(function(){
  $('#signup_form').submit(function(event){
    event.preventDefault();
    hue.signup_user();
  });
  $('#signin_form').submit(function(event) {
    event.preventDefault();
    hue.signin_user();
  });
})
