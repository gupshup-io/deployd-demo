var getenv = require('getenv');

_ = require('lodash'); // require lodash globally
request = require('request-promise'); // require requestpromise globally

// create the global config
config = {
    'dpdServerRoot' :  getenv('SM_DPD_SERVER_ROOT'),
    'dpd_port' :    2403,
    'dpd_env' :    'development',
    'sm_apikey': '23694a99d1f4466dc6cb0241a54c5b21'
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
