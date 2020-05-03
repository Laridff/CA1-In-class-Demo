



$(function(){
$("#delete").prop('disabled', true);
$("#update").prop('disabled', true);
$("#submit").prop('disabled', false);

$("#add").click(function(){
$("#delete").prop('disabled', true);
$("#update").prop('disabled', true);
$("#submit").prop('disabled', false);
});

$("#delete").click(function(){
var dataId=$("#dataId").val();
$.ajax({
            url: 'https://shrouded-gorge-86216.herokuapp.com/api/likeanangel/'+dataId,
            type: 'delete',
            dataType: 'json',
             
            success: function (data) {
               alert("deleted Successfully");
 $("#section").val("");
            $("#item").val("");
           $("#price").val("");
           $("#title").val("");
$("#myModal").modal('hide');
 location.reload(true);
            }, error: function (request, status, error) {
        alert(request.responseText);
    }
         
        });


});



$("#update").click(function(){

var dataId=$("#dataId").val();

var dataJson = {
            section:$("#section").val(),
            item:item=$("#item").val(),
            price:$("#price").val(),
            title:$("#title").val()
        };

$.ajax({
            url: 'https://shrouded-gorge-86216.herokuapp.com/api/likeanangel/'+dataId,
            type: 'put',
            dataType: 'json',
             data: JSON.stringify(dataJson),
            contentType: 'application/json',
            success: function (data) {
               alert("Updated Successfully");
 $("#section").val("");
            $("#item").val("");
           $("#price").val("");
           $("#title").val("");
$("#myModal").modal('hide');
 location.reload(true);
            }, error: function (request, status, error) {
        alert(request.responseText);
    }
         
        });


});




$("#submit").click(function(){



var dataJson = {
            section:$("#section").val(),
            item:item=$("#item").val(),
            price:$("#price").val(),
            title:$("#title").val()
        };
console.log(JSON.stringify(dataJson));

$.ajax({
            url: 'https://shrouded-gorge-86216.herokuapp.com/api/likeanangel',
            type: 'post',
            dataType: 'json',
             data: JSON.stringify(dataJson),
            contentType: 'application/json',
            success: function (data) {
               alert("Added Successfully");
 $("#section").val("");
            $("#item").val("");
           $("#price").val("");
           $("#title").val("");
$("#myModal").modal('hide');
 location.reload(true);

            }, error: function (request, status, error) {
        alert(request.responseText);
    }
         
        });


});







$("#callApi").click(function(){
$("#example").show();
$('#table1').DataTable().destroy();

  $.ajax({
    type: "get", url: "https://shrouded-gorge-86216.herokuapp.com/api/likeanangel",
    success: function (data, text) {
      var table= $('#example').DataTable( {
        "data": data,
        "columns": [
           
           
            { "data": "section" },
            { "data": "item" },
            { "data": "price" },
            
{
        //adds td row for button
      data: null,
      render: function ( data, type, row ) {
        return '<!-- Button trigger modal --><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" >View</button>';
 
 }


      }
        ]
    } );

 $('#example tbody').on( 'click', 'button', function () {

$("#update").prop('disabled', false);
$("#delete").prop('disabled', false);
$("#submit").prop('disabled', true);
        var data2 = table.row( $(this).parents('tr') ).data();
       
$("#dataId").val(data2._id);
  $.ajax({
    type: "get", url: "https://shrouded-gorge-86216.herokuapp.com/api/likeanangel/"+data2._id,
    success: function (data, text) {

           $("#section").val(data.section);
            $("#item").val(data.item);
           $("#price").val(data.price);
           $("#title").val(data.title);
 },
    error: function (request, status, error) {
        alert(request.responseText);
    }
});
    } );


    },
    error: function (request, status, error) {
        alert(request.responseText);
    }
});

});
  
});