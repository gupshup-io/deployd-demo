var getenv = require('getenv');

_ = require('lodash'); // require lodash globally
request = require('request-promise'); // require requestpromise globally
shellQuoteParse = require('shell-quote').parse;

// create the global config
config = {
    'dpdServerRoot' :  getenv('SM_DPD_SERVER_ROOT'),
    'sm_apikey': '2a2f7dbfcee845adc541d28d43b41792',
    'mashape_apikey': getenv('MASHAPE_APIKEY'),
    'dpd_port' :    2403,
    'dpd_env' :    'development',
    'sm_api_root': 'http://dev-api.webaroo.com/sm/api/'
  };


init(config);

function init(config){

  console.log("Welcome to deployd!  Config loaded!");

  _.forEach(config, function(n, key){
    console.log(key, " : ",  n);
  });

  var deployd = require('deployd');
  var deploydOptions = {
    port: config.dpd_port,
    env: config.dpd_env
  };
  var dpd = deployd(deploydOptions);
  dpd.listen();

  dpd.on('listening', function() {
    console.log("Deployd is listening on port ", deploydOptions.port);
  });

  dpd.on('error', function(err) {
    console.error(err);
    process.nextTick(function() { // Give the server a chance to return an error
      process.exit();
    });
  });

  console.log("");
}

//
// global functions
//

getHeaders = function getHeaders(){
  return {
    'content-type': 'application/x-www-form-urlencoded',
    'cache-control': 'no-cache',
    'apikey' : config.sm_apikey
  };
};
