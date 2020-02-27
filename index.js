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

// HashMap Temporary Databas

const
  Nlp = require('./Nlp.js'),
  DataBase = require('./DataBase.js'),
  Response = require("./response.js"),
  DynamoDB = require('./Dynamo.js');


var async = require('async');

// Declearing temporary Database 
// in the form of HashMap
var dataBase = new DataBase();
const nlp = new Nlp();

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

      var userData = {};
      userData['psid'] = sender_psid;

      
      var user_checker =  DynamoDB.getUserInfo( sender_psid, "Employee" );

      // console.log(Replies.replies);

      user_checker.then(
          result => {
            var text;
            if( !(result.Item !== undefined && result.Item !== null) ){
              DynamoDB.insert( sender_psid, "Employee" );
              userData['state'] = "INITIATE"
              console.log("Done putting the user into the DataBase check for more info, User is an Outsider");
              text = "Done putting the user into the DataBase check for more info, User is an Outsider";
            }
            else{
              console.log("User already Exists inside the employee table for now");
              text =" User already exists inside table now. UserId is " + result.Item["uid"];
            }

            sendMessage(sender_psid, Response.genTextReply(text));


            if (webhook_event.message) {
              handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
              handlePostback(sender_psid, webhook_event.postback);
            }


          },
          error =>{
            console.log("Promise Failed because of " + error);
          }

      );

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function

      
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
  
  response = Response.genTextReply("Hello");

  // Send the response message
  sendMessage(sender_psid, response);
}

function handleQuickReplies(userData, quick_reply) {
  let payload = quick_reply.payload;
  if (userData['state'] == 'ifReturn' && !('ifReturn' in userData)) {
    if (payload.includes('NO')) userData['ifReturn'] = false;
    else if (payload.includes('YES')) userData['ifReturn'] = true;
  }
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;
  var userData = dataBase[sender_psid];

  // Get the payload for the postback
  let payload = received_postback.payload;

  console.log("HERE!!! ");
  console.log( payload );

  // Set the response based on the postback payload
  if (payload === 'INITIATE') {
      dataBase.register(dataBase, sender_psid);
      userData = dataBase[sender_psid];
      userData['state']="initiate";
      response = nlp.response( userData['state'], userData );
      sendMessage(sender_psid, response);
      userData['state'] = 'intent';
      console.log("userData State = " + userData['state']);
      return;

  } else if (payload === 'FLIGHT') {
    dataBase.register(dataBase, sender_psid);
    userData = dataBase[sender_psid];
    userData['intent']="flight";
    userData['state']='intent';
    response = nlp.findState(userData);

  }
  else if(payload === 'Book Flight'){
    if( userData['state'] == 'pickFlight' ){
      dataBase.insert( userData, 'pickFlight', true );
      response = nlp.findState( userData );
    }
    else{
      dataBase.insert( userData, 'returnFlight', true );
      response = nlp.findState( userData );
    }
  }
  else if (payload === 'HOTEL') {
    dataBase.register(dataBase, sender_psid);
    userData['intent']="hotel";
    response = { "text": "SORRYYYY CANT HANDLE THIS NOWW" }
  } else{
    response = { "text": "HAHA, would u like to book a flight?" }
  }

  // response = nlp.findState(userData);
  // Send the message to acknowledge the postback
  sendMessage(sender_psid, response);

}

function sendMessage(sender_psid, responses) {


  if (Array.isArray(responses)) {
    let delay = 0;
    for (let response of responses) {

      setTimeout(()=>callSendAPI(sender_psid,response), (delay+1) * 3000 - 1000 );   // 2000  5000  8000
      setTimeout(()=> senderAction( sender_psid, Response.getAnimation("on")), (delay)*3000 );                 // 0    3000   6000


      delay++;

    }
    //setTimeout(()=> senderAction(sender_psid, Response.getAnimation("off")),delay*20000);
   // senderAction( sender_psid, Response.getAnimation("on"), (delay+2)*3000 );                 // 0    3000   6000

  } else {
    callSendAPI(sender_psid, responses);
  }




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

function senderAction(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "sender_action" : response['sender_action']
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
/*
curl -X POST -H "Content-Type: application/json" -d '{
"get_started":{
    "payload":"INITIATE"
  },
  "persistent_menu": [
        {
            "locale": "default",
            "composer_input_disabled": false,
            "call_to_actions": [
                {
                    "type": "postback",
                    "title": "Book a Flight",
                    "payload": "FLIGHT"
                },
                {
                    "type": "postback",
                    "title": "Book a Hotel",
                    "payload": "HOTEL"
                },
                {
                    "type": "postback",
                    "title": "Talk to an agent",
                    "payload": "CARE_HELP"
                }

            ]
        }
    ],
    "greeting": [
    {
      "locale":"default",
      "text":"Hello {{user_first_name}}! Book a hotel or a flight!"
    }, {
      "locale":"en_US",
      "text":"Hi {{user_first_name}}! Book a hotel or a flight!"
    }
  ],
   "whitelisted_domains":[
    "https://kiwi.com/"
  ]
}' "https://graph.facebook.com/v6.0/me/messenger_profile?access_token=EAAkdTVETz5UBABiMRU4LChbImzlhRbIZBL76hdxdTZBQCrR8gm3iUlo2MKsdbzQJgYYX6cvdL5KaMrtJueuOwl6pPHZBrZCV3nzdGPL92wFLWnF6GDqISffJMj0SBZAfv07hwo2fqZBdsjw9rwlLkApvuWDWRrZA26K9tNVdsN6hwjZBoBZCFd4GBsb7Px8W5RB4ZD"
 */

 /*

 curl -X POST -H "Content-Type: application/json" -d '{
  "recipient":{
    "id":"<PSID>"
  },
  "sender_action":"typing_on"
}' "https://graph.facebook.com/v2.6/me/messages?access_token=EAAkdTVETz5UBADPOy5ilvETlWxWS1ohXxXL51SPt0FiIZADGJQZAaCuNYeddPNccUu2meywF9SmC7ZBAot0bqEgDYHHi9z8AD691ecETBQFoFsb8iMoTOzZAIjSV7dScpZCyGWAPeGZCCW0xpdfALy4pggyxUgdZBGxxaJqRfpT2bjn2Co31Sg9"

2751654314911195

curl -X POST -H "Content-Type: application/json" -d '{
  "recipient":{
    "id":"2751654314911195
"
  },
  "sender_action":"typing_on"
}' "https://graph.facebook.com/v2.6/me/messages?access_token=EAAkdTVETz5UBADPOy5ilvETlWxWS1ohXxXL51SPt0FiIZADGJQZAaCuNYeddPNccUu2meywF9SmC7ZBAot0bqEgDYHHi9z8AD691ecETBQFoFsb8iMoTOzZAIjSV7dScpZCyGWAPeGZCCW0xpdfALy4pggyxUgdZBGxxaJqRfpT2bjn2Co31Sg9"
 */