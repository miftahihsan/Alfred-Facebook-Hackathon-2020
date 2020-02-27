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



const
  Nlp = require('./Nlp.js'),
  DataBase = require('./DataBase.js'),
  Response = require("./response.js"),
  DynamoDB = require('./Dynamo.js');

const Replies = require("./replies.js");

var async = require('async');
var userData = {};

const nlp = new Nlp();

// Sets server port and logs message on success
app.listen(process.env.PORT || 8000, () => console.log('webhook is listening'));

app.post('/sendMessageToUser' , (req, res) => {
  let body = req.body;
  let uid = body.uid;
  console.log("BROADCAST REQUESTED");
  sendReminders(uid, Response.genTextReply("This is a reminder every hour"));

  res.status(200).send('EVENT_RECEIVED');
});


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


      userData['uid'] = sender_psid;

      
      var employee_checker =  DynamoDB.getUserInfo( sender_psid, "Employee" );
      var publicUser_checker =  DynamoDB.getUserInfo( sender_psid, "PublicUser" );


      Promise.all([employee_checker, publicUser_checker]).then(
          results => {
            let employee = results[0];
            let publicUser = results[1];

            var text;
            if( !(employee.Item !== undefined && employee.Item !== null) ){
              // NOT in employee check if in public user
              userData['type'] = "PublicUser";

              if ( !(publicUser.Item !== undefined && publicUser.Item !== null) ){
                DynamoDB.insert( sender_psid, "PublicUser" );
                userData['state'] = "INITIATE";
                console.log("Done putting the user into the DataBase check for more info, User is an Outsider");
                text = "Done putting the user into the DataBase check for more info, User is an Outsider";
              }
              else{
                //User already in publicUser
                userData['state'] = publicUser['context'];
                text = "User already in public User table";
              }


            }
            else{
              userData['type'] = "Employee";
              console.log("User already Exists inside the employee table for now");
              
              // just for now
              userData['state'] = publicUser['context'];

              text = Replies.replies[userData['state']];
            }

            console.log("-------------------------------------------------------------------------");
            console.log(text);
            
            //sendMessage(sender_psid, text);

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

      DynamoDB.updateUserState(userData['uid'], userData['type'], userData['state']);

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

  // Checks if the message contains text

  if (received_message.quick_reply){       //Button replies
    handleQuickReplies(sender_psid, received_message.quick_reply);
  }
  else if (received_message.text) {

    // Compiles the user text message and makes meaning out if it
    // using which it fills the user table appropriately.

    console.log("-------------------------------------------------------------------");
    console.log(received_message.nlp.entities);
    console.log("-------------------------------------------------------------------");


    nlp.compile( received_message.nlp.entities, userData, dataBase ); // maybe do it only initially

  }

    // get a response for the particular state now
    response = nlp.findState(userData);

    console.log("state = " + response['text']);
    console.log("current state = " + userData['state']);
    console.log("-------------------------------------------------------------------");
  
  console.log(response);

  // Send the response message
   sendMessage(sender_psid, response);
}

function handleQuickReplies(sender_psid, quick_reply) {
  let payload = quick_reply.payload;
  userData['state'] = payload;
  let response = Replies.replies[userData['state']];
  sendMessage(sender_psid, response);

}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  // Get the payload for the postback
  let payload = received_postback.payload;
  userData['state'] = payload;
  let response = Replies.replies[userData['state']];
  sendMessage(sender_psid, response);

}

function sendMessage(sender_psid, responses) {


  if (Array.isArray(responses)) {
    let delay = 0;
    for (let response of responses) {

      setTimeout(()=>callSendAPI(sender_psid,response), (delay+1) * 2000 - 500 );   // 1500  3500  5500
      setTimeout(()=> senderAction( sender_psid, Response.getAnimation("on")), (delay)*2000 );                 // 0    2000   3000


      delay++;

    }

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

// Sends response messages via the Send API
function sendReminders(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response,
    "messaging_type": "MESSAGE_TAG",
    "tag": "CONFIRMED_EVENT_UPDATE"
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
                    "title": "Menu",
                    "payload": "MENU"
                },
                {
                    "type": "postback",
                    "title": "Initiate",
                    "payload": "INITIATE"
                }

            ]
        }
    ],
    "greeting": [
    {
      "locale":"default",
      "text":"Hello {{user_first_name}}! I am BizBot!"
    }, {
      "locale":"en_US",
      "text":"Hi {{user_first_name}}! I am BizBot!"
    }
  ],

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