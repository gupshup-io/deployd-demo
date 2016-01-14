$addCallback();
request = require('request-promise');

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
  var message = "you got a poll " + url; // genate a url
  debugger;
  var promise = dpd.sms.get({ text: message }); // send it in
  $finishCallback();
  return promise;
}).catch(function(err){
  console.log("poll-test  error: " + err);
});


function createPoll(){
  var options = {
    method: 'PUT',
    uri: 'http://api.webaroo.com/SMApi/api/smartmsg/poll',
    headers: { 'content-type': 'application/x-www-form-urlencoded',
       'cache-control': 'no-cache',
       apikey: '23694a99d1f4466dc6cb0241a54c5b21'
    },
    form: { question: 'This is a sample test.',
       callbackUrl: 'http://127.0.0.1/'
    }
  };

  return request(options, function (err, response, body) {

  });
}

function generateSignedLink(smid){

  var options = {
    method: 'POST',
    uri: 'http://api.webaroo.com/SMApi/api/smartmsg/msg/' + smid + '/signedlink',
    headers:
     { 'content-type': 'application/x-www-form-urlencoded',
       'postman-token': '9f84b06e-0f26-16de-8b8f-17bcc12d55dd',
       'cache-control': 'no-cache',
       apikey: '23694a99d1f4466dc6cb0241a54c5b21' },
    form: { destination: '+19203686356' }
  };

  return request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });

}
