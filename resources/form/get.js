$addCallback();
request = require('request-promise');
if(!query.number){
  console.log("no query.number");
  cancel();
}
query.number = "+1" + query.number;
console.log("number: " +  query.number);
createForm()
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
  var message = "you got a form " + url;
  return dpd.sms.get( { text: message, number: query.number } ); // send it in
}).then(function(getResults){
  console.log("got :", getResults);
  $finishCallback();
})
.catch(function(err){
  console.log("form-test  error: ", err);
});


function createForm(){

  var options = { method: 'PUT',
    url: 'http://api.webaroo.com/SMApi/api/smartmsg/survey',
    headers: getHeaders(),
    form: { question: 'This is a sample form.',
       callbackUrl: 'http://fotoflo.ngrok.com/callback',
       options: [ [ 'test1', 'test2' ], 'test3' ]
     }
    };

  return request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
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
