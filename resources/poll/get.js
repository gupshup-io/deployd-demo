$addCallback();
request = require('request-promise');
if(!query.number){
  console.log("no query.number");
  cancel();
}
query.number = "+1" + query.number;
console.log("number: " +  query.number);
createPoll()
  .then(function(body){
  //get the smid from poll
  // and then generate a signed link
  body = JSON.parse(body);
  var smid = body.id;

  return generateSignedLink(smid);
}).then(function(linkId){ //take the signed link
  linkId = JSON.parse(linkId);
  linkId = linkId[0].id;
  var url = "https://smapi.teamchat.com/SMApi/api/embed/" + linkId;
  var message = "you got a poll " + url;
  return dpd.sms.get( { text: message, number: query.number } ); // send it in
}).then(function(getResults){
  console.log("got :", getResults);
  $finishCallback();
})
.catch(function(err){
  console.log("poll-test  error: ", err);
});


function createPoll(){
  var options = {
    method: 'PUT',
    uri: 'http://api.webaroo.com/SMApi/api/smartmsg/poll',
    headers: getHeaders(),
    form: { question: 'This is a sample test.',
       callbackUrl: 'http://fotoflo.ngrok.com/callback'
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
    apikey: '23694a99d1f4466dc6cb0241a54c5b21'
  };
}
