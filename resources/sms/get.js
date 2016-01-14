var options = { method: 'PUT',
  url: 'http://api.webaroo.com/SMApi/api/sms/msg',
  headers:
   { 'content-type': 'application/x-www-form-urlencoded',
     'postman-token': '8df23220-70cd-93e0-e948-159ebe129dae',
     'cache-control': 'no-cache',
     apikey: '23694a99d1f4466dc6cb0241a54c5b21' },
  form:
   { destination: '+19203686356',
     text: query.text,
     source: 'not used'
   }

};

$addCallback();
request(options, function (error, response, body) {
  if (error) throw new Error(error);
  $finishCallback();
  setResult("body");
});
