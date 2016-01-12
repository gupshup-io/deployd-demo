var request = require("request");

var options = { method: 'POST',
  url: 'http://stag-solutions.teamchat.com/SmartMessageService/sendMsg',
  headers:
   { 'content-type': 'application/x-www-form-urlencoded',
     'postman-token': '6c65611a-f2fe-f7da-5e85-3f56d4f590b2',
     'cache-control': 'no-cache',
     apikey: '23694a99d1f4466dc6cb0241a54c5b21' },
  form:
   { 
      question: 'Do you like icecreams ?',
      msgType: 'poll',
      msgDesc: 'a poll for testing',
      smsCreds: '{"accountId":"2000151262", "password":"aZfgX5", "recipients":["+15186334898"], "source":"test" }',
   }
};

$addCallback();

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  setResult(body);
  $finishCallback();
});
