init();

//
// function definitions
//

function init(){
  var responseCount = 1;

  // handles the emit('callback', data) event emmited from deployd server
  dpd.on('callback', function(response){
    debugger;
    $('#responseContainer').hide().removeClass('hide').slideDown('fast');

    var tableRow =  '<tr>' +
                      '<th scope="row">' + responseCount++ + '</th>' +
                      '<td>' + response.question + '</td>' +
                      '<td>' + response.user + '</td>' +
                      '<td>' + response.response + '</td>' +
                    '</tr>';

    $("#responses").append(tableRow);
  });
}

// called on click for go(type)
function go(type){
  // get and validate the number
  var num = $('#mobile-number-'+type).val().replace(/\D/g,'');
  if(num.length !== 10){
    $("#errormsg-"+type).hide().removeClass('hide');
    setTimeout(function(){ $("#errormsg-"+type).hide(); }, 3000); // show err for 3 sec
    return;
  }


  var question = $('#' + type + '-question').val();
  var options = [];
  $('.' + type + ' .option').each(function(i, e){
    options.push($(this).val());
  });

  dpd[type].get({ number: num, options: options, question: question})
    .then(function(data, err){
      if(err){
        alert("error sending message, check server status");
      }
      $("#successmsg-"+type).hide().removeClass('hide');
      setTimeout(function(){ $("#successmsg-"+type).hide(); }, 3000);
    });
}

var options = {
  optionsCount : 3,
  add : function(){
    var div ='<div class="form-group row" id="surveyOption-' + this.optionsCount +'">'
      + '<label for="survey-option-' + this.optionsCount + '" class="col-sm-2 form-control-label">Option ' + this.optionsCount + '</label>'
      + '<div class="input-group col-sm-7">'
      +    '<input type="text" class="form-control option" id="option' + this.optionsCount + '" aria-describedby="survey-option">'
     + '</div>'
     + '<div class="col-sm-3">'
      +    '<button onclick="options.remove(' + this.optionsCount + ')">x</button>'
     + '</div>'
    + '</div>';

    $("#surveyOption-" + (this.optionsCount-1)).after(div);

    this.optionsCount++;
  },
  remove : function(n){
    $("#surveyOption-"+n).remove();
    this.optionsCount--;
  }
}
