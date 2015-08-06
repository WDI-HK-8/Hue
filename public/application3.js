//color management page
var Hue = function(){
}
var hue = new Hue();

Hue.prototype.postColorData = function(color_hex, project_name){
  //construct color data
  var color_data = {};
  color_data['project_name'] = project_name;
  color_data['color_hex'] = color_hex;
  color_data['color_list'] = [
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
      $('#colorpicker_form input').val('');
      Hue.prototype.getColorData(color_data.project_name);
    },
    error: function(error){
      console.log(error);
    }
  });
}


Hue.prototype.getColorData = function(project_name){
  var color_html = '<tr class="color_row" data-toggle="tooltip" data-placement="bottom" title=""><td></td></tr>';
  $.ajax({
    url: '/colors/get?keyword='+project_name, //@colors.js
    type: 'GET',
    dataType: 'JSON',
    data: name,
    success: function(response){
      $('.container table').html('');
      var color_list = [];
      for(var i in response[0].colors){
        color_list = color_list.concat(Object.keys(response[0].colors[i])).reverse();
      }
      if(color_list.length > 0){
        var animate_ctr = 0;
        for(var k in color_list){
          $('.container table').prepend(color_html);
        }
        for(var j in color_list){
          $($('.color_row')[j]).css('background-color', '#'+color_list[j]);
          $($('.color_row')[j]).attr('title', '#'+color_list[j]);
        }
       $('.color_row').each(function(index, el) {
          $(this).animate({'left': '0px'}, 1500, function(){
            $(this).animate({'top': animate_ctr*120+'px'}, 1500);
            animate_ctr++;
          });
        });
      }
    },
    error: function(error){
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
  //Bootstrap tooltip initialization
  $('[data-toggle="tooltip"]').tooltip();

  //Store and display project name
  var query_str = window.location.href.slice(window.location.href.indexOf('project') + 8);
  var modulus_index = query_str.indexOf('%');
  if(modulus_index > 0){
    query_str = query_str.slice(0,modulus_index) + ' ' + query_str.slice(modulus_index+3);
  }
  
  //get color list
  hue.getColorData(query_str);

  //animate main
  $('.container').css('left', '-500px').animate({'left':'0px'}, 875);

  $('#colorpicker_form').css('right', '-1800px').animate({'right':'0px'},950);

  $('#def_form').css('bottom', '-500px').animate({'bottom':'0px'},875);

  $('.navbar-brand h1').text(query_str);
  $('#myValue').change(function(event) {
    $('#color_side').css('background-color', '#' + $(this).val());
  });

  $(document).on('mouseover', '.color_row', function(){
    $(this).tooltip('show');
    $(this).css('border','4px darkgrey solid');

  })
  //post data, refresh color list
  $('#submit_btn').click(function(event) {
    var color_hex = $('#myValue').val();
    hue.postColorData(color_hex, query_str);

  });

  $('.dropdown').click(function(){
    hue.deleteSession();
  });
});
