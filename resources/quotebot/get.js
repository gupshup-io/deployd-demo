// create a sms resource
// runs on get of dpdServerRoot/sms?query or dpd.sms.get({query1: item1})
// Lives in it's own little closure

var mashape_endpoint = 'https://andruxnet-random-famous-quotes.p.mashape.com/';

init();

postMashape(query.message)

.then(function(results){
  results = JSON.parse(results)
  console.log("Quote :", results || "Success");
  setResult( results.quote + " -" + results.author );
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
  if(!_.has(query, "message")){
    console.log("no query.message");
    throw new Error("no phone message");
  }

  console.log("keyword: " + query.message);
}

function postMashape(query){
  var options = { method: 'PUT',
    url: mashape_endpoint,
    headers: {
        "X-Mashape-Key" : config.mashape_apikey,
        "Content-Type" :  "application/x-www-form-urlencoded",
        "Accept" :  "application/json"
      },
    form: { cat : query.message }
  };

  return request(options, function (error, response, body) {
    if (error) throw new Error(error);
  });
}


