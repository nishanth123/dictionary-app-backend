var http=require('http');
const express = require('express');

const app = express();

const cors = require('cors');
const axios = require('axios');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

var server=http.createServer((function(request,response)
{
	response.writeHead(200,
  {"Content-Type" : "text/plain"});
  
      axios.get(`https://od-api.oxforddictionaries.com/api/v1/entries/en/stubborn`, 
      { 
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Content-Type' : 'application/json',
          'app_id': '3d2db6c7',
          'app_key': 'e0853a2930fcab285ccb1c45dba4548f'
        }, 
        withCredentials: true,
        credentials: 'same-origin'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

	response.end("The Oxford-Dictionary API has been invoked \n");
}));

server.listen(7000);
