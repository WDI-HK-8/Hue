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
        //Validate response?
      } 
    },
    success:function(response){
      console.log(response);
    }
  });
};

//DOM ready
$(function(){
  $('#signup_form').submit(function(event){
    event.preventDefault();
    hue.signup_user();
  });
})
