$(function(){
  var query_str = window.location.href.slice(window.location.href.indexOf('project') + 8);
  $('.navbar-brand h1').text(query_str);
  $('#myValue').change(function(event) {
    $('#colorpicker_form').css('background-color', '#' + $(this).val());
  });

});
