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
    success:function(response){ //change page to color library
      console.log(response);
    },
    error:function(error){
      console.log(error);
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
