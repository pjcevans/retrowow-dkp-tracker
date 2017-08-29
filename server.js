'use strict'

//first we import our dependencies...
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Export = require('./model/exports');

let auth = process.env.DKP_TEST_MONGODB;

//and create our instances
var app = express();

//set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.API_PORT || 3001;

app.use(express.static(__dirname + "/build"));

// Express only serves static assets in production


mongoose.connect(auth, { useMongoClient: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');


  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now  we can set the route path & initialize the API


app.get('/api/exports', function(req, res) {
    //looks at our Export Schema
    Export.find(function(err, people) {
      if (err)
        res.send(err);
      //responds with a json object of our database comments.
      res.json(people)
    }).sort('date');
  })
  //post new comment to the database
app.post('/api/exports', function(req, res) {
  //body parser lets us use the req.body
  Export.findOneAndUpdate(
    { date: req.body.date },
    { dkpdata: req.body.dkp,
      dkparray: req.body.dkparray,
      guild: req.body.guild },
    // { $push: {dkpdata: req.body.dkp} },
    { safe: true, upsert: true },
    function(err, model) {
        console.log(err);
    });
});



//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
