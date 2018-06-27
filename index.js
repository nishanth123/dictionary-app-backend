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
  response.writeHead(200,
  {"Content-Type" : "text/plain"});
  
      var url = request.url.toString(); 
      url = "https://od-api.oxforddictionaries.com/api/v1/entries/en" + url;
      
      axios.get(url, 
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
        try {
          var arrayLength = obj.examples.length;
          
          for (var i = 0; i < arrayLength; i++ ) {
            examples[i] = obj.examples[i].text;
          }
        } catch (err) {

        }

        var output = { name: result.id, meaning: obj.definitions[0], examples: examples };
        response.data = output;
        response.write(JSON.stringify(output));
        response.end("");      
      })
      .catch(function (error) {
        console.log(error);
      });
  
}));

server.listen(7000);