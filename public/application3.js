//color management page
var Hue = function(){
}
var hue = new Hue();

Hue.prototype.postColorData = function(color_hex, project_name){
  //construct color data
  var color_data = {};
  color_data[color_hex] = [
    $('#def1').val(),
    $('#def2').val(),
    $('#def3').val()
  ];
  color_data.project_name = project_name;
  
  $.ajax({
    url: '/colors/create', //@colors.js
    type: 'POST',
    dataType: 'JSON',
    data: color_data, //needs to pass obj
    success: function(response){
      console.log('success yo');
      console.log(response);
    },
    error: function(error){
      console.log('error yo');
      console.log(error);
    }
  });

}

Hue.prototype.deleteSession = function(){
  $.ajax({
    url: '/sessions',
    type: 'DELETE',
    dataType: 'JSON',
    success: function(respond){
      window.location = '/';
    },
    error: function(error){
      console.log(error);
    }
  });
}

//DOM Ready
$(function(){
  //Store and display project name
  var query_str = window.location.href.slice(window.location.href.indexOf('project') + 8);
  var modulus_index = query_str.indexOf('%');
  if(modulus_index > 0){
    query_str = query_str.slice(0,modulus_index) + ' ' + query_str.slice(modulus_index+3);
  }

  //animate main
  $('.container').css('left', '-500px').animate({'left':'0px'}, 875);

  $('#colorpicker_form').css('right', '-1800px').animate({'right':'0px'},950);

  $('#def_form').css('bottom', '-500px').animate({'bottom':'0px'},875);

  $('.navbar-brand h1').text(query_str);
  $('#myValue').change(function(event) {
    $('#color_side').css('background-color', '#' + $(this).val());
  });

  $('#submit_btn').click(function(event) {
    var color_hex = $('#myValue').val();
    hue.postColorData(color_hex, query_str);
  });

  $('.dropdown').click(function(){
    hue.deleteSession();
  });
});
