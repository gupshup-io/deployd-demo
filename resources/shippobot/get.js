// create a quotes resource
// runs on get of dpdServerRoot/shippobot?keyword=kw or dpd.shippobot.get({keyword: "kw"})
// Lives in it's own little closure

$addCallback(); // deployd method to nest callbacks/promises inside event functions

init();
getShippo()
.then(function(shippoResponse){
  console.log('shippo :', shippoResponse || 'Success');
  handleShippoResponse(shippoResponse);
  $finishCallback(); // deployd method to nest callbacks/promises inside event functions
})

.catch(function(err){
  console.log('shippobot error: ', err);
  setResult( 'shippobot error: ', err );
  $finishCallback(); // deployd method to nest callbacks/promises inside event functions
});

function handleShippoResponse(res){
  console.log(" *** handling response ***");
  var result;
  if(res.tracking_status === null){
    result = "Sorry, Unable to find that package!";
  } else {
    result = '*Carrier:* ' + res.carrier + '\n' +
       '*Tracking Number:* ' + res.tracking_number + '\n' +
       '*Status:* ' + res.tracking_status.status + '\n' +
       '*History:* ' + parseTrackingHistory(res.tracking_history);
  }

  setResult(result);
}

function parseTrackingHistory(history){
  var historyStr = '\n';
  history.forEach(function(event, i){
    var eventStr = '*' +(i+1) + '*  -  ' + event.status_date  + ' ' +
      event.status + ' - ' +
      event.location.city + ' ' + event.location.country + ', ' +
      event.location.zip + '\n ';

    historyStr += eventStr;
  });

  return historyStr;
}

//
// Function Definitions
//

function init(){
  validateQuery();
  console.log(query.message);
}

function validateQuery(){

  if(!_.has(query, 'message')){
    console.log('no query.message');
    cancel();
  }

  var m = query.message.toLowerCase();

  m = m.split(" ");

  if(m.length != 2){
    console.log("invalid message");
    cancel();
  }

  if( m[0] !== "usps"&&
    m[0] !== "ups"   &&
    m[0] !== "fedex" &&
    m[0] !== "dhl_express" &&
    m[0] !== "canada_post" &&
    m[0] !== "lasership"   &&
    m[0] !== "mondial_relay"  ){
    console.log("invalid message");
    cancel();
  }

  console.log(query);
  query.carrier = m[0];
  query.trackingcode = m[1];
  return query;
}

function getShippo(){
  console.log("here");
  var url = 'http://hackers-api.goshippo.com/v1/tracks/' + query.carrier + "/" + query.trackingcode;
  console.log('url = ' + url);

  var options = {
    method: 'GET',
    json: true,
    url: url,
    headers: {
        'Content-Type' :  'application/x-www-form-urlencoded',
        'Accept' :  'application/json'
      }
  };

  return request(options, function (error, response, body) {  // request-promise lib returns a promise
    if (error) throw new Error(error);
  });
}


