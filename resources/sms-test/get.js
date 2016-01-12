var request = require("request");

var options = { method: 'POST',
  url: 'http://stag-solutions.teamchat.com/SmartMessageService/sendMsg',
  headers:
   { 'content-type': 'application/x-www-form-urlencoded',
     'postman-token': '6c65611a-f2fe-f7da-5e85-3f56d4f590b2',
     'cache-control': 'no-cache',
     apikey: 'f9191e5c7d344ef6ce7a1316468b496e' },
  form:
   { question: 'sample question',
     msgType: 'poll',
     msgDesc: 'a poll for testing',
     smsCreds: '{"accountId":"2000144103", "password":"u46dn4", "recipients":["9203686356"], "source":"test" }',
   }
};

$addCallback();

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  setResult(body);
  $finishCallback();
});
