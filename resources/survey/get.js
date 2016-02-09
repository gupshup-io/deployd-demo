// create a form resource
// runs on get of dpdServerRoot/form?query or dpd.form.get({query1: item1})
// Lives in it's own little closure

init();

createSurvey()
.then(function(body){
  //get the smid from form
  // and then generate a signed link
  body = JSON.parse(body);
  console.log("Survey created:", body);

  return dpd.sign.get( { smid: body.id, number: query.number } ); // link is signed to the userID
})

.then(function(link){ //take the signed link
  var message = "you got a survey " + link;
  return dpd.sms.get( { text: message, number: query.number } ); // send it in
})


.then(function(getResults){ // result from sending SMS
  console.log("create survey got :", getResults);
  setResult( {code: 200, message: "success" } );
  $finishCallback();
})


.catch(function(err){
  console.log("Form error: ", err);
  setResult( {error: true, code: 500, message: err} );
  $finishCallback();  // required by deployd for nested callbacks
});

//
// FUNTION DEFINITIONS
//

function init(){
  $addCallback();  // required by deployd for nested callbacks
  if(!query.number){
    console.log("no query.number");
    cancel();
  }
  query.number = "+1" + query.number;
  console.log("number: " +  query.number);
}

function createSurvey(){

  var url = config.sm_api_root + '/smartmsg/survey?';
  var questions = [ 'test1', 'test2', 'test3' ];

  url += "options=";
  for(var i in questions){
    url += escape(questions[i]) + ';';
  }

  url += "&question=" + escape("this is my question?");
  url += "&callbackUrl=" + config.dpdServerRoot + '/callback';

  console.log("***** SURVEY URL *****: "  + url);

  var options = {
    method: 'PUT',
    url: url,
    headers: getHeaders()
  };

  console.log("creating survey with :", options);
  return request(options, function (error, response, body) {
    if (error) throw new Error(error);
  });
}

