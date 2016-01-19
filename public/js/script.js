init();

//
// function definitions
//

function init(){
  var count = 1;

  // handles the emit('callback', data) event emmited from deployd server
  dpd.on('callback', function(response){
    $('#responseContainer').hide().removeClass('hide').slideDown('fast');

    var tableRow =  '<tr>' +
                      '<th scope="row">' + count++ + '</th>' +
                      '<td>' + response.user + '</td>' +
                      '<td>' + response.response + '</td>' +
                    '</tr>';

    $("#responses").append(tableRow);
  });
}

// called on click for go(type)
function go(type){
  var num = $('#mobile-number-'+type).val().replace(/\D/g,'');

  if(num.length !== 10){
    $("#errormsg-"+type).hide().removeClass('hide');
    setTimeout(function(){ $("#errormsg-"+type).hide(); }, 3000);
    return;
  }

  dpd[type].get({ number: num })
    .then(function(data, err){
      if(err){
        alert("error sending message, check server status");
      }
      $("#successmsg-"+type).hide().removeClass('hide');
      setTimeout(function(){ $("#successmsg-"+type).hide(); }, 3000);
    });
}
