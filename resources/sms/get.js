// create a sms resource
// runs on get of dpdServerRoot/sms?query or dpd.sms.get({query1: item1})
// Lives in it's own little closure

init();


sendSMS(query)


.then(function(getResults){
  console.log("sendSMS got:", getResults || "Success");
  setResult( {code: 200, message: "success" }  );
  $finishCallback();
})


.catch(function(err){
  console.log("sms-test  error: ", err);
  setResult( {error: true, code: 500, message: err} );
  $finishCallback();
});

//
// Function Definitions
//

function init(){
  $addCallback();
  if(!_.has(query, "number")){
    console.log("no query.number");
    throw new Error("no phone number");
  }

  if(!_.has(query, "text")){
    console.log("no query.text");
    throw new Error("no message text");
  }

  console.log("number: " + query.number);
  console.log("text: " + query.text);
}

function sendSMS(query){
  var options = { method: 'PUT',
    url: 'http://api.webaroo.com/SMApi/api/sms/msg',
    headers: getHeaders(),
    form:
     { destination: query.number,
       text: query.text,
       source: 'not used'
     }
  };

  return request(options, function (error, response, body) {
    if (error) throw new Error(error);
  });
}

function getHeaders(){
  return {
    'content-type': 'application/x-www-form-urlencoded',
    'cache-control': 'no-cache',
    apikey: '23694a99d1f4466dc6cb0241a54c5b21'
  };
}
