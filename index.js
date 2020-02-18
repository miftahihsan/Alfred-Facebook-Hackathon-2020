'use strict';

// Testing URL

// curl -X GET "https://getschwifty.herokuapp.com/webhook?hub.verify_token=miftah&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"
// curl -H "Content-Type: application/json" -X POST "https://getschwifty.herokuapp.com/webhook" -d '{"object": "page", "entry": [{"messaging": [{"message": "Hello"}]}]}'

// Kill port if already in use
// kill $(lsof -t -i:8000)

// These are all Server related imports
const
  express = require('express'),
  bodyParser = require('body-parser'),
  VERIFY_TOKEN = process.env.VERIFY_TOKEN,
  PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN,
  request = require('request'),
  app = express().use(bodyParser.json()); // creates express http server

// My Imports
let count  = 0;

// HashMap Temporary Database


const
  Nlp = require('./Nlp.js'),
  DataBase = require('./DataBase.js');


// Declearing temporary Database 
// in the form of HashMap
var dataBase = new DataBase();

// Sets server port and logs message on success
app.listen(process.env.PORT || 8000, () => console.log('webhook is listening'));


// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  

  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    
    
      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);

      // registering the user into the HashMap
      if( !( sender_psid in dataBase ) ) {
        dataBase.register( dataBase, sender_psid );
        dataBase.insert(dataBase[sender_psid], "state", "initiate" );    // initiate and greet
        // callSendAPI(sender_psid, 
        //   {'text' : 'HEY! I am Get Schwifty Bot, here at your service to book you hotels and flights of your choice! \n\nLets Get Started! 🎉 🎉 🎉'}
        // )
        console.log("Greeting Summoner!");
      }
      else {
        console.log("Welcome Back!! user = " + sender_psid );
      }
    
      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);        
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
      
    });

    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});



// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.

  // Uncomment for testing purpose
  // let VERIFY_TOKEN = "miftah"
    
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
  
    // Checks the mode and token sent is corrects
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});


// Check Documentation for sending and detecting attachment

// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response;
  var userData = dataBase[sender_psid];


  var msg = received_message.text.toLowerCase();

  console.log("Current STATE = " + userData['state']);
  console.log( "current MSG = " + msg );
  
  // if( msg.includes("no") && userData["state"] == 'ifReturn' ){
  //   userData["ifReturn"] = true;
  // }

  // if( msg.includes("yes") && userData["state"] == 'ifReturn' ){
  //   userData["ifReturn"] = true;
  // }

  // Checks if the message contains text
  if (received_message.text) {
    
    const nlp = new Nlp();

    console.log( count );

    // Compiles the user text message and makes meaning out if it
    // using which it fills the user table appropriately. 

    console.log("-------------------------------------------------------------------");

    console.log(received_message.nlp.entities);

    console.log("-------------------------------------------------------------------");

    console.log("star=te  " + userData['state']);
    if( userData['state'] == 'initiate' ){
      response = {
        'text' : nlp.response( userData['state'], userData )
      }
      callSendAPI(sender_psid, response);
      userData['state'] = 'intent';
      console.log("userData State = " + userData['state']);
      return;
    }
    
    
    if( userData['state'] == 'intent' ){
      nlp.compile( received_message.nlp.entities, userData, dataBase ); // maybe do it only initially
    }
    else if( received_message.nlp.entities[userData['state']][0]['confidence'] > 0.7 ){
      dataBase.insert( userData, userData['state'], received_message.nlp.entities[userData['state']][0]['value'] );
    }
    
    // get a response for the particular state now
    response = {
      'text' : nlp.findState(userData)
    }

    console.log("state = " + nlp.findState(userData));

    // Uncomment later  

    console.log( "database = " + dataBase );

    console.log("-------------------------------------------------------------------");

    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API  

  }

  if( response == null ){
    response = {
      "text": `sorry i didnt get that`
    }
  }
  
  console.log(response);

  // Send the response message
  callSendAPI(sender_psid, response);    
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;
  
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "Thanks!" }
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." }
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}