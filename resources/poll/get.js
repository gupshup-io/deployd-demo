// create a poll resource
// runs on get of dpdServerRoot/poll?query or dpd.poll.get({query1: item1})
// Lives in it's own little closure

init();

createPoll()


.then(function(body){
  console.log("you got a body: " + body);
  body = JSON.parse(body);
  return dpd.sign.get( { smid: body.id, number: query.number } ); // link is signed to the userID
})


.then(function(link){
  var message = "you got a poll " + link;
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
  $finishCallback();  // required by deployd for nested callbacks
});

//
//   FUNCTION DEFINITIONS
//

function init(){
  $addCallback(); // required by deployd for nested callbacks

  if(!_.has(query, "number")){
    console.log("no query.number");
    throw new Error("no phone number");
  }
  query.number = "+1" + query.number;
  console.log("number: " +  query.number);
}

function createPoll(){
  console.log(config.sm_api_root + '/smartmsg/poll');
  var options = {
    method: 'PUT',
    uri: config.sm_api_root + '/smartmsg/poll',
    headers: getHeaders(),
    form: {
      question: query.questions[0],
      callbackUrl: config.dpdServerRoot + '/callback?question=' + query.questions[0]
    }
  };

  return request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log("poll created");
  });
}


