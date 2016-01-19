init();

generateSignedLink(query.smid, query.number)
  .then(function(link){
    link = JSON.parse(link);
    link = "https://smapi.teamchat.com/SMApi/api/embed/" + link[0].id;
    console.log("generated signed link: ", link);

    setResult(link);
    $finishCallback();
  });

//
// function definitions
//

function init(){
  $addCallback();
  if(!_.has(query, "number")){
    console.log("no query.number");
    throw new Error("no phone number");
  }

  if(!_.has(query, "smid")){
    console.log("no query.smid");
    throw new Error("no message smid");
  }

  console.log("number: " + query.number);
  console.log("smid: " + query.smid);
}


function generateSignedLink(smid, number){

  var options = {
    method: 'POST',
    uri: 'http://api.webaroo.com/SMApi/api/smartmsg/msg/' + smid + '/signedlink',
    headers: getHeaders(),
    form: { destination: number }
  };

  return request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log("generated signed link", body);
  });

}
