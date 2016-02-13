# This is a cloneable repo to get started using TeamChat's omnichannel bot apis#

## Installation ##

1) Set env variables so the server knows its own address (for callbacks)
2) Install nodejs
3) Install dependancies (enumerated in package.json);
4) Run the server:
`
export SM_DPD_SERVER_ROOT=address.to.your.server.tld
export SM_APIKEY=your_gupshup_api_key
export MASHAPE_APIKEY=your_mashape_api_key
cd gupshup-demo
npm install 
node production.js
`
then point your browser to:
http://localhost:2403/ or address.to.your.server.tld

## code structure and hints ##
/node_modules - dependancies, listed in package.json.
/production.js - the runscript where global and env variables are set
/public - where the static assets are - index.html is accessable at /index.html
/dpd.js - this project relies on the deployd.com framework.  dpd.js presents tools for interacting with the REST api's from html. Otherwise they are all open.

/resources 
    - these are all accessable at http://localhost:2403/dashboard
    - they provide REST endpoints at /resource_name
    - for example, /resources/form/get.js is accessable via GET request to http://localhost:2403/form?query_key=value or from the front end or other resources by calling the method dpd.form.get({query_key:value})
    - In the above example, the variable query_key is available from within /resources/form/get.js as the variable query.query_key

## More about the deployd framework ##
http://deployd.com

