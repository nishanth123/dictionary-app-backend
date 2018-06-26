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

var server = http.createServer((function(request,response)
{
  console.log('test-1');

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
      .then(function (resp) {
        
        var result = resp['data']['results'][0]; 

        var obj = result.lexicalEntries[0].entries[0].senses[0];

        var examples = [];
        examples[0] = obj.examples[0].text;
        examples[1] = obj.examples[1].text;

        var output = { name: result.id, meaning: obj.definitions[0], examples: examples };
        console.log('test-2');
        response.data = output;
        console.log(response.data);
        console.log('test-5')
        response.write(JSON.stringify(output));
        response.end("The Oxford-Dictionary API has been invoked \n");      
      })
      .catch(function (error) {
        console.log(error);
      });

  console.log('test-3');
  console.log(response.data);
  //response.write(response.data);
  
}));

server.listen(7000);
