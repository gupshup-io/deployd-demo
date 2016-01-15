// create a form resource
// runs on get of dpdServerRoot/form?query or dpd.form.get({query1: item1})
// Lives in it's own little closure

init();

createSurvey()
.then(function(body){
  //get the smid from form
  // and then generate a signed link
  body = JSON.parse(body);
  var smid = body.id;

  return generateSignedLink(smid); // link is signed to the userID
})

.then(function(linkId){ //take the signed link
  linkId = JSON.parse(linkId);
  linkId = linkId[0].id;
  var url = "https://smapi.teamchat.com/SMApi/api/embed/" + linkId;
  var message = "you got a form " + url;
  return dpd.sms.get( { text: message, number: query.number } ); // send it in
})


.then(function(getResults){
  console.log("create survey got :", getResults);
  setResult( {code: 200, message: "success" } );
  $finishCallback();
})


.catch(function(err){
  console.log("Form error: ", err);
  setResult( {error: true, code: 500, message: err} );
  $finishCallback();
});

//
// FUNTION DEFINITIONS
//

function init(){
  $addCallback();
  if(!query.number){
    console.log("no query.number");
    cancel();
  }
  query.number = "+1" + query.number;
  console.log("number: " +  query.number);
}

function createSurvey(){

  var options = { method: 'PUT',
    url: 'http://api.webaroo.com/SMApi/api/smartmsg/survey',
    headers: getHeaders(),
    form: { question: 'This is a sample survey.',
       callbackUrl: config.dpdServerRoot + '/callback',
       options: [  'test1', 'test2', 'test3' ],
       type: "survey"
     }
    };

  return request(options, function (error, response, body) {
    if (error) throw new Error(error);
  });
}

function generateSignedLink(smid){

  var options = {
    method: 'POST',
    uri: 'http://api.webaroo.com/SMApi/api/smartmsg/msg/' + smid + '/signedlink',
    headers: getHeaders(),
    form: { destination: '+19203686356' }
  };

  return request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log("generated signed link");
  });

}

function getHeaders(){
  return {
    'content-type': 'application/x-www-form-urlencoded',
    'cache-control': 'no-cache',
    apikey: config.sm_apikey
  };
}
