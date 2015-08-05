//color management page
var Hue = function(){
}
var hue = new Hue();

Hue.prototype.postColorData = function(color_hex){
//construct color data
color_data = {};
color_data[color_hex] = [
  $('#def1').val(),
  $('#def2').val(),
  $('#def3').val()
];

  $.ajax({
    url: '/colors/create', //@colors.js
    type: 'POST',
    dataType: 'JSON',
    data: color_data,
    success: function(response){
      console.log(response);
    },
    error: function(error){
      console.log(error);
    }

  })

}

//DOM Ready
$(function(){
  //Store and display project name
  var query_str = window.location.href.slice(window.location.href.indexOf('project') + 8);
  $('.navbar-brand h1').text(query_str);
  $('#myValue').change(function(event) {
    $('#color_side').css('background-color', '#' + $(this).val());
  });

});
