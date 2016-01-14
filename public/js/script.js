function go(){
  dpd.poll.get({number: $('#mobile-number').val() })
    .then(function(data, err){
      if(err){
        alert("error sending message, check server status");
      }
      $("#successmsg").hide().removeClass('hide').slideDown('fast');
      setTimeout(function(){ $("#successmsg").hide(); }, 3000);
    });
}

count = 0;

dpd.on('callback', function(response){
  $('#responseContainer').hide().removeClass('hide').slideDown('fast');
  $("#responses").append('<tr><th scope="row">' + count++ + '</th><td>' + response.user + '</td><td>' + response.response + '</td></tr>');
});

