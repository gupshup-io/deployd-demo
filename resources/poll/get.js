// create a poll resource
// runs on get of dpdServerRoot/poll?query or dpd.poll.get({query1: item1})
// Lives in it's own little closure

init();

createPoll()


  .then(function(body){
  body = JSON.parse(body);
  return generateSignedLink(body.id); // link is signed to the userID
})


.then(function(linkId){
  linkId = JSON.parse(linkId);
  var message = "you got a poll "
    + "https://smapi.teamchat.com/SMApi/api/embed/"
    + linkId[0].id;
  return dpd.sms.get( { text: message, number: query.number } ); // send it in to the sms resource
})


.then(function(getResults){
  console.log("create-poll: ", getResults);
  setResult( {code: 200, message: "success" }  );
  $finishCallback();
})


.catch(function(err){
  console.log("Poll  error: ", err);
  setResult( {error: true, code: 500, message: err} );
  $finishCallback();
});

//
//   FUNCTION DEFINITIONS
//

function init(){
  $addCallback();

  if(!_.has(query, "number")){
    console.log("no query.number");
    throw new Error("no phone number");
  }
  query.number = "+1" + query.number;
  console.log("number: " +  query.number);
}

function createPoll(){
  var options = {
    method: 'PUT',
    uri: 'http://api.webaroo.com/SMApi/api/smartmsg/poll',
    headers: getHeaders(),
    form: {
      question: 'This is a sample poll.',
      callbackUrl: config.dpdServerRoot + '/callback'
    }
  };

  return request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log("poll created");
  });
}

function generateSignedLink(smid){

  var options = {
    method: 'POST',
    uri: 'http://api.webaroo.com/SMApi/api/smartmsg/msg/' + smid + '/signedlink',
    headers: getHeaders(),
    form: { destination: query.number }
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
