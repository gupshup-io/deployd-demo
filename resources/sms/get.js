
var options = { method: 'PUT',
  url: 'http://api.webaroo.com/SMApi/api/sms/msg',
  headers: getHeaders(),
  form:
   { destination: query.number,
     text: query.text,
     source: 'not used'
   }
};
 console.log("number: " + query.number);


$addCallback();
request(options, function (error, response, body) {
  if (error) throw new Error(error);
  $finishCallback();
  console.log("text sent");
});


function getHeaders(){
  return {
    'content-type': 'application/x-www-form-urlencoded',
    'cache-control': 'no-cache',
    apikey: '23694a99d1f4466dc6cb0241a54c5b21'
  };
}
