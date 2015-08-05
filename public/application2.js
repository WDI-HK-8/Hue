//Signed-in Page

//Class Constructor
var Hue = function(){
}
var hue = new Hue();

Hue.prototype.getAllProjects = function(){
  $.ajax({
    url: '/projects',
    type: 'GET',
    dataType: 'JSON',
    success: function(respond){ //Object.keys(
      var project_list = respond[0].projects;
      for(var x in project_list){
        $('#addNewRow').before('<tr><td><button id="edit_project_btn" type="submit" class="btn btn-warning">Edit</button></td><td><h3>'+ Object.keys(project_list[x]) +'</h3></td><td>No colors yet.</td><tr>');
      }
    },
    error: function(error){
      console.log(error);
    }
  });
}

Hue.prototype.postNewProject = function(that){
  $.ajax({
    url: '/projects',
    type: 'POST',
    dataType: 'JSON',
    data:{
      project_name: that.prev().val()
    },
    success: function(respond){ //on successful POST request...
      var project_name = respond.project_name;
      that.parent().html('<h3>'+project_name+'</h3>');
    },
    error: function(error){
      console.log(error);
    } //FIX THE MONGO DB UPDATE @ project.js
  });
}

Hue.prototype.deleteSession = function(){
  $.ajax({
    url: '/sessions/'+'signout',
    type: 'DELETE',
    dataType: 'JSON',
    success: function(respond){
      window.location= '/';
    },
    error: function(error){
      console.log(error);
    }
  });
}

Hue.prototype.getProject = function(){
  $.ajax({
    url: '/colors', //insert project name
    type: 'GET',
    dataType: 'JSON',
    success: function(response){
      console.log(response);
      // window.location = '/project/colors';
    },
    error: function(error){
      console.log(error);
    }
  })
}

$(function(){
  // GET ALL PROJECTS ON DOM READY
  hue.getAllProjects();

  $('#add_proj_btn').click(function(event) {
    $('#addNewRow').before('<tr><td></td><td><input type="text" class="form-control new_proj" placeholder="e.g. home remodeling, social media campaign,...etc"></input><button type="submit" class="btn btn-success" id="new_proj_btn"> confirm</button></td><td>No colors yet.</td><tr>');
  }); //LATER: when you type, add button...for a POST request, then GET request. 

  $(document).on('click','#new_proj_btn', function(){
    var that = $(this);
    hue.postNewProject(that);
  });

  $(document).on('click','#edit_project_btn', function(){ 
    hue.getProject();
  });

  $('#myModal').modal('toggle');

  //SIGNOUT
  $('.dropdown').click(function(){
    hue.deleteSession();
  });
});