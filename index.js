// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date', async function(req, res)
{
  try
  {
    let date = isNaN(Number(req.params['date'])) ? req.params['date'] : Number(req.params['date']);

    console.log(`-> Date Received: ${date}`);

    let dateObj;
    
    //If date was not inserted, we consider the current time
    if(!req.params.hasOwnProperty('date')) dateObj = new Date();
    else dateObj = new Date(date);
    
    //Sending Response
    if(dateObj.toUTCString() != 'Invalid Date')
      res.json(
        {
          unix: Date.parse(dateObj),
          utc: dateObj.toUTCString()
        });
    else
      res.json(
        {
          error: 'Invalid Date'
        });
    
  }
  catch(error)
  {
    console.log(`An error ocurred: ${error}`);
    res.status(400).json({msg: 'error'});
  }

});

// listen for requests :)

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
