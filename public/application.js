//Class Constructor
var Hue = function(){
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
      if (response.user_exists_alrdy==true) {
        $('.form-horizontal').prepend('<div class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span> Sorry! This email already has an account.</div>').fadeIn(1500, function(){
            $('.form-horizontal .alert').fadeOut(5000);
          });
      }

      else if (response.same_pwd == false){
        $('.form-horizontal').prepend('<div class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span> Sorry! Passwords MUST match.</div>').fadeIn(1500, function(){
            $('.form-horizontal .alert').fadeOut(5000);
          });
      }

      else if (response.same_pwd != false && response.user_exists_alrdy != true){
        $('#signup_form input').val('');
        $('#myModal').modal('toggle');
      }
      //joi should take care of blanks.
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
      //redirect to projects page on successful log in
      console.log(response);
      if(response.authenticated === true){
        window.location = '/users/'+response.user_id+'/projects'; // @static-pages.js
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
