var _ = require('lodash');
var getenv = require('getenv');

//getenv('DPD_SERVER_ROOT'),
var config = {
    'dpdServerRoot' :  'localhost'  ,
    'dpd_port' :    2403,
    'dpd_env' :    'development',
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
