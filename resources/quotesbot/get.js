// create a quotes resource
// runs on get of dpdServerRoot/quotebot?keyword=kw or dpd.quotebot.get({keyword: "kw"})
// Lives in it's own little closure

$addCallback(); // deployd method to nest callbacks/promises inside event functions
console.log("running quotesbot: " + query.message);

init();
postMashape(query.message)
.then(function(mashapeResponse){
  console.log('Quote :', mashapeResponse || 'Success');
  setResult(mashapeResponse.quote + " -" + mashapeResponse.author );
  $finishCallback(); // deployd method to nest callbacks/promises inside event functions
})

.catch(function(err){
  console.log('quotebot error: ', err);
  setResult( 'quotebot error: ', err );
  $finishCallback(); // deployd method to nest callbacks/promises inside event functions
});

//
// Function Definitions
//

function init(){
  validateQuery();
  if( (query.message == 'quote')){
    return;
  } else {
    cancle();
  }
}

function validateQuery(){
  if(!_.has(query, 'message')){
    console.log('no query.message');
    throw new Error('no phone message');
  }
  query.message = query.message.toLowerCase();
}

function postMashape(message){
  var url = 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=' + message;
  console.log('url = ' + url);

  var options = {
    method: 'POST',
    json: true,
    url: url,
    headers: {
        'X-Mashape-Key' : config.mashape_apikey,
        'Content-Type' :  'application/x-www-form-urlencoded',
        'Accept' :  'application/json'
      }
  };

  return request(options, function (error, response, body) {  // request-promise lib returns a promise
    if (error) throw new Error(error);
  });
}


