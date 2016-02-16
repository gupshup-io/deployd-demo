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

  dpd.tracks.post({
      owner: 'shippobot',
      event: 'track',
      properties: query
    });

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

  var m = query.message.toLowerCase().split(" ");
  console.log(m);

  if( atShippobot(m[0]) ){ // it's to shippobot
    if( !validateCarrier(m[1]) || m.length !== 3){
      console.log("to shippobot but imporper");
      printHelp(); // if it's to shippobot but imporper
    }
    m.shift();
  }

  if(m.length != 2){
    cancel(); // invalid message
  }

  if( !validateCarrier(m[0]) ){
    printHelp();
    cancel();
  }

  console.log(query);
  query.carrier = m[0];
  query.trackingcode = m[1];
  return query;
}

function atShippobot(m){
  var valid = false;
  if(m == '@shippobot' || m == '@shippobot:' || m == 'shippobot'){
    valid = true;
  }
  return valid;
}

function printHelp(){
  console.log("printing help");
  var h = '*Welcome to Shippobot* \n ' +
    'I can help you to track packages at seven different carriers. \n ' +
    '*To use Shippobot* , you can DM me, or say my name in a channel with: <carrier> <tracking number>. \n' +
    '*For example:* \" shippobot usps 9400110898680015376677\"\n ' +
    '*I support the following carriers:* ups, usps, fedex, dhl_express, canada_post, lasership and mondial_relay';
  setResult(h);
  $finishCallback();
}

function validateCarrier(m){
  if( m !== "usps"&&
    m !== "ups"   &&
    m !== "fedex" &&
    m !== "dhl_express" &&
    m !== "canada_post" &&
    m !== "lasership"   &&
    m !== "mondial_relay"  ){
    return false;
  }
  return true;
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


