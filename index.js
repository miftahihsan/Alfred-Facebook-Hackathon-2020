'use strict';

// Testing URL

// curl -X GET "https://getschwifty.herokuapp.com/webhook?hub.verify_token=miftah&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"
// curl -H "Content-Type: application/json" -X POST "https://getschwifty.herokuapp.com/webhook" -d '{"object": "page", "entry": [{"messaging": [{"message": "Hello"}]}]}'

// Kill port if already in use
// kill $(lsof -t -i:8000)

// These are all Server related imports
const
  fetch = require('node-fetch'),
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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/userList', (req, res) => {     //REMINDERS
  let body = req.body;
  console.log("here!---------inside--UserList---------------------------------------------");
  console.log( body );
  if ('uid' in body && body.uid!==null && body.title!=='') {
    let data ={};
    data['ind'] = body.ind+"";
    data['title'] = body.title;
    data['items'] = body.items;

    DynamoDB.updateReminder(body.uid,"Employee", data);


    let msg = Response.genQuickReply("Your reminders have been added successfully! ^_^ ", [
      {
        title: "View Reminders 📝",
        payload: "VIEW_REMINDERS"
      },
      {
        title: "Create Reminder 🗒",
        payload: "NEW_REMINDER"
      },
      {
        title: "View Meeting 📆",
        payload: "VIEW_SCHEDULE"
      }
    ]);
    console.log(msg);
    sendReminders(body.uid, msg);

    console.log("Updated!");
  }

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.status(200).send('EVENT_RECEIVED');
});

app.post('/sendMessageToUser' , (req, res) => {
  let body = req.body;
  let uid = body.uid;
  console.log("BROADCAST REQUESTED");
  sendReminders(uid, Response.genTextReply("This is your daily reminder!"));
  sendReminders(uid, Replies.replies["VIEW_REMINDERS"]);

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

      if( 'standby' in entry ){
        console.log("standy by in entry");
        return;
      }

      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
    
      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;

      //  new line

      console.log('Sender PSID: ' + sender_psid);
      
      senderAction(sender_psid, Response.getAnimation("on"));

      var user_info = getUserName(sender_psid);
      var employee_checker =  DynamoDB.getUserInfo( sender_psid, "Employee" );
      var publicUser_checker =  DynamoDB.getUserInfo( sender_psid, "PublicUser" );
   

      Promise.all([employee_checker, publicUser_checker, user_info]).then(
          results => {
            let employee = results[0];
            let publicUser = results[1];
            let user_name = results[2];

            // Replies.user_name = user_name['name'];
            userData['name'] = user_name['name'];
            userData['profile_pic'] = user_name['profile_pic'];
            

            var text;
            if( !(employee.Item !== undefined && employee.Item !== null) ){
              // NOT in employee check if in public user
              userData['type'] = "Employee"; // change it to plublic user later

              if ( !(publicUser.Item !== undefined && publicUser.Item !== null) ){
                DynamoDB.insert( sender_psid, "Employee" );
                userData['state'] = "INITIATE";
                text = "Done putting the user into the DataBase check for more info, User is an Outsider";
              }
              else{
                //User already in publicUser
                userData["Item"] = publicUser.Item;
                userData['state'] = userData.Item.context;
                text = "User already in public User table";
                userData['name'] = user_name['name'];
                Replies.setUserData(userData);
              }


            }
            else{
              // just for now
              userData["Item"] = employee.Item;
              userData['type'] = "Employee";
              userData['state'] = userData.Item.context;
              userData['name'] = user_name['name'];
              Replies.setUserData(userData);
            }

            Replies.userData = userData;
            Replies.uid = sender_psid;
            Replies.setUID(sender_psid);
            // Replies.setUserData(userData);

            //sendMessage(sender_psid, text);
            senderAction(sender_psid, Response.getAnimation("off"));

            userData['uid'] = sender_psid;

            seenBy(sender_psid);

            if (webhook_event.message) {
              handleMessage(sender_psid, webhook_event.message, user_name);
            } else if (webhook_event.postback) {
              handlePostback(sender_psid, webhook_event.postback, user_name);
            }else{
              sendMessage(sender_psid, Replies.replies["WELCOME_BACK"] );
              enablePersistentMenu(sender_psid);
            }


            // REMOVE LATER IF NO NEEDED
            //console.log("I AM HERE");
            DynamoDB.updateUserState(userData['uid'], userData['type'], userData['state']);

          },
          error =>{
            console.log("Promise Failed because of " + error);
          }

      );
      
      // ORIGINAL PLACE
      // console.log("I AM HERE");
      // DynamoDB.updateUserState(userData['uid'], userData['type'], userData['state']);

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
function handleMessage(sender_psid, received_message, user_name) {
  let response;

  // Checks if the message contains text

  if (received_message.quick_reply){       //Button replies
    handleQuickReplies(sender_psid, received_message.quick_reply);

    if( received_message.quick_reply.payload.includes("_")){
      var arr = received_message.quick_reply.payload.split("_");

      if( arr[0] === 'TIME' && arr.length === 3 ){
        

        //UPDATE MEETING IN DATABASE
        DynamoDB.createMeeting({
          "set_by" : userData['uid'],
          "time" : arr[1] +" " + arr[2],
          "profile_pic" : userData['profile_pic'],
          "name" : userData['name']
        });

        DynamoDB.getIdColumn()
        .then(res => {
          console.log("Announcement !!!!");
          console.log(res.Items[0].uid);
          let c = res.Count;
          for (let i=0;i< c;i++){
            if (res.Items[i].uid.S===sender_psid)continue;
            //UNCOMMENT THIS  LATER PLEASE
            sendMessage(res.Items[i].uid.S, [Response.genTextReply("A meeting has been scheduled by " + userData['name']),
              {
                "attachment": {
                  "type": "template",
                  "payload": {
                    "template_type": "generic",
                    "image_aspect_ratio": "square",
                    "elements": [{
                      "title": "Do you wish to attend this meeting?",
                      "subtitle": "Time of meeting : " + arr[1] + " " + arr[2],
                      "image_url": userData['profile_pic'],
                      "buttons": [
                        {
                          "type": "postback",
                          "title": "Sure thing!",
                          "payload": "MEETING_" + sender_psid + "_YES",
                        },
                        {
                          "type": "postback",
                          "title": "Sorry I'm busy!",
                          "payload": "MEETING_" + sender_psid + "_NO",
                        }
                      ],
                    }]
                  }
                }
              }
              ]);
          }


        })
        .catch(err => {
          console.log("Announcement ERROR !!!!");
          console.log(err);
        });

      }

    }

  }
  else if (received_message.text) {

    if(  userData['state'] === "COMPLAINT_EMPLOYEE" || userData['state'] === "COMPLAINT_DPT"   ){
      if( received_message.text.toLowerCase() == "done" ){
        userData['state'] = "COMPLAINT_SUCCESS";
        sendMessage(sender_psid, Replies.replies[userData['state']]);
      }
    }

    else if( userData['state'] === "REPORT_STATS" || userData['state'] === "REPORT_STATS_ATTACHMENT" ){

      let response = Replies.replies['REPORT_STATS_ERROR_MSG'];
      sendMessage(sender_psid, response);
      return;
    }
    else{
      nlp.compile( received_message.nlp.entities, userData ); // maybe do it only initially
      response = nlp.findState(userData, received_message.text);
      sendMessage(sender_psid, response);
    }

  }
  else if (received_message.attachments){

    if(  userData['state'] === "COMPLAINT_EMPLOYEE" || userData['state'] === "COMPLAINT_DPT"   ){
      console.log("ATTACHMENT!!!!!!!!!!!s");
    }
    else if( userData['state']==='REPORT_STATS' ){
      userData['state'] = 'REPORT_STATS_ATTACHMENT';
      sendMessage(sender_psid, Replies.replies[userData['state']]);
    }
    else if( userData['state'] === 'REPORT_STATS_ATTACHMENT' || userData['state'] === 'COMPLAINT_ATTACHMENT' ){
      sendMessage(sender_psid, Replies.replies[userData['state']]);
    }
    else {
      // REPLY WITH GIF
      let responses = [Response.genAttachmentReply()];

      let reply = Replies.replies[userData['state']];
      
      let replyArray = [];

      if( !Array.isArray(reply) ) {
        replyArray.push(reply);
      }
      else{
        replyArray = reply;
      }

      responses = responses.concat(replyArray);


      sendMessage(sender_psid, responses);

    }
  }

}

function seq( sender_psid, response, i ){

  if( i >= response.length ){
    return;
  } 
  
  senderAction(sender_psid, Response.getAnimation("on"));

  let result = callSendAPI(sender_psid, response[i]);

  if(  'attachment' in response[i]  ){
    result
    .then(res => {
      console.log("SUCEESS " + res);
      
      seq( sender_psid, response, i + 1 );
    });
  }
  else{
    setTimeout( ()=> {
      result
      .then(res => {
        console.log("INSIDE " + res);
        seq( sender_psid, response, i + 1 );
      }),
      2000
    });
  }
  
  // callSendAPI(sender_psid, response[i])
  // .then(res => {
  //   console.log("SUCEESS " + res);
    
  //   seq( sender_psid, response, i + 1 );
  // });

}


function handleQuickReplies(sender_psid, quick_reply) {
  let payload = quick_reply.payload;

  userData['state'] = payload;
  let response = Replies.replies[userData['state']];


  if( userData['state'] == "BORED" ){
    seq( sender_psid, response, 0 );
    return;
  }

  if(userData['state'] === "COMPLAINT_EMPLOYEE" || userData['state'] === "COMPLAINT_DPT" ){
    sendMessage( sender_psid, Replies.replies["COMPLAINT_INSTRUCTION"] );
  }
  else if (userData['state']==="SUBMIT_REPORT"){
    sendMessage(sender_psid, [
      {
        "attachment":{
            "type":"image",
            "payload":{
                "url": "https://media.giphy.com/media/DoCIC5Pxp57qg/giphy-downsized.gif"
            }
        }
      },
      Response.genTextReply("Document successfully transferred to your manager!"),
    ].concat(
      Replies.replies["COMMUNICATE"]
    ));
    userData['state']="COMMUNICATE";
  }
  else if( userData['state'] === 'LIVE_YES' ){
    userData['state'] = "INITIATE";
    sendMessage(sender_psid, response );
    disablePersistentMenu(sender_psid);
    giveAdminAccess( sender_psid ); 
  }
  else if (userData['state'] === 'VIEW_SCHEDULE'){
    userData['state'] = "SCHEDULE";
    let response;
    let temp = [];
    DynamoDB.getAllMeetings().then(res=>{
        let c = res.Count;
        // console.log("----------viewschedule------------");
        // console.log(res)
        // console.log("----------viewschedule------------");
        if (c === 0) {
          response = Replies.replies['VIEW_SCHEDULE'];
        }
        else {
          let data = res.Items;
          // response = Response.genGenericTemplate(data);
          response = [];

          for( var i = 0; i < data.length; i++ ){
            // console.log("set_by = " + data[i]['set_by'].S);
            // console.log("uid = " + userData['uid']);

            let attending=false;

            if( 'attendees' in data[i] ){
              data[i]['attendees'].L.forEach(u=>{
                console.log(u);
                if (u.S == userData['uid'])attending=true;
              });
            }

            if( data[i]['set_by'].S === userData['uid']  || attending){
              temp.push( data[i] );
              console.log(response);
              console.log("Length = " + response.length);
            }

          }

          // console.log('============================');

          // console.log(data);

          // console.log(response);
        }
        if( temp.length == 0 ) response = Replies.replies['VIEW_SCHEDULE'];
        else{
          response = Response.genGenericTemplate( temp );
        }
        sendMessage(sender_psid, response);

      }

    )
  }
  else{
    // let response = Replies.replies[userData['state']];
    sendMessage(sender_psid, response);
  }
}


function giveAdminAccess( sender_psid ){

  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "target_app_id" : 263902037430900,
    "metadata":"Please attend as soon as possible to the user"
  };

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/pass_thread_control",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
    } else {
      console.error("Unable to connect to live admin:" + err);
    }
  });
}


// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback, user_name) {

  // Get the payload for the postback
  let payload = received_postback.payload;


  // THIS IS WHERE THE CODE OF MEETING WILL RUN

  /*
    0 -> MEETING,
    1 -> SENDER_ID,
    2 -> YES,NO,
    3 -> NAME OF THE PEROSN WHO SET UP THE MEETING --> ETA NAI
  */
  if( payload.includes('_') ){
    var arr = payload.split('_');
    if( arr.length === 3 && arr[0] === 'MEETING' ){
      let response;

        DynamoDB.getMeetingInfo(arr[1]).then(
          res=>{
            let responded=false;
            console.log("attendeee");
            console.log(res);
            if ('attendees' in res.Item) {
              res.Item.attendees.forEach(id => {
                if (id == userData['uid']) {
                  responded = true;
                }
              });
            }
            if ('decliners' in res.Item){
              res.Item.decliners.forEach(id=>{
                if (id == userData['uid']){
                  responded = true;
                }
              })
            }
            if (!responded) {
              if( arr[2] === "YES" ) {
                response = {'text': userData['name'] + " wanted to let you know that he will be able to attend the meeting."};
                //update attendee in database
                DynamoDB.updateAttendingMeeting(arr[1], userData['uid']);
              }

              else{
                response = {'text' : userData['name'] + " wanted to let you know that he will not be able to attend the meeting." };
                DynamoDB.updateDecliningMeeting(arr[1], userData['uid']);
              }
              callSendAPI(arr[1], response);

            }
            else{
              sendMessage(sender_psid, Response.genTextReply("Your response has already been recorded."));
            }

          });



      return;
    }
  }



  userData['state'] = payload;
  let response = Replies.replies[userData['state']];
  sendMessage(sender_psid, response);

 
}

// new function
async function getUserName( sender_psid ){
  let response = await fetch('https://graph.facebook.com/'+sender_psid+'?fields=name,first_name,last_name,profile_pic&access_token='+process.env.PAGE_ACCESS_TOKEN+'')
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
      // log("could not get nake");
    })

  let json = await response.json();
  
  return json;
}


function sendMessage(sender_psid, responses) {


  if (Array.isArray(responses)) {
    let delay = 0;
    for (let response of responses) {

      setTimeout(()=>callSendAPI(sender_psid,response), (delay) * 1000 );   // 0 1000  2000  3000
      setTimeout(()=> senderAction( sender_psid, Response.getAnimation("on")), (delay)*1000 + 300 );   // 300  1300  2300  3300

      // it was 2 changed it to 4 
      if ("attachment" in response && response['attachment']['type'] === "image")delay+=4;

      delay++;
    }
    setTimeout(()=> senderAction( sender_psid, Response.getAnimation("off")), (delay)*1000 + 300 );   // 300  1300  2300  3300

  } else {
    callSendAPI(sender_psid, responses);
  }

}


// Sends response messages via the Send API
async function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  return await new Promise( ( req, er ) => { 
    request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log("Message sent!");
      return req(res);
    } else {
      console.error("Unable to send message:" + err);
      return er(res);
    }
  }) } );
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
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}

function seenBy(sender_psid) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "sender_action" : "mark_seen"
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
    } else {
      console.error("Unable to send message:" + err);
    }
  });


}

function disablePersistentMenu(sender_psid) {
  // Construct the message body
  let request_body = {
    "psid": sender_psid,
    "persistent_menu": []
  };



  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v6.0/me/custom_user_settings",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
    } else {
      console.error("Unable to disable menu:" + err);
    }
  });


}

function enablePersistentMenu(sender_psid) {
  // Construct the message body



  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v6.0/custom_user_settings",
    "qs": { "psid": sender_psid,
      "params": "[%22persistent_menu%22]",
      "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "DELETE",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
    } else {
      console.error("Unable to enable menu:" + err);
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
                    "title": "Say Hi! 👋",
                    "payload": "INITIATE"
                },
                {
                    "type": "postback",
                    "title": "Main Menu \u2630",
                    "payload": "MENU"
                },

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
  ]

}' "https://graph.facebook.com/v6.0/me/messenger_profile?access_token=EAAkdTVETz5UBABiMRU4LChbImzlhRbIZBL76hdxdTZBQCrR8gm3iUlo2MKsdbzQJgYYX6cvdL5KaMrtJueuOwl6pPHZBrZCV3nzdGPL92wFLWnF6GDqISffJMj0SBZAfv07hwo2fqZBdsjw9rwlLkApvuWDWRrZA26K9tNVdsN6hwjZBoBZCFd4GBsb7Px8W5RB4ZD"

/*
 /*

 curl  \
  -F 'message={"attachment":{"type":"image", "payload":{"is_reusable":true}}}' \
  -F 'filedata=@./steve.gif;type=image/gif' \
  "https://graph.facebook.com/v6.0/me/message_attachments?access_token=EAAkdTVETz5UBABiMRU4LChbImzlhRbIZBL76hdxdTZBQCrR8gm3iUlo2MKsdbzQJgYYX6cvdL5KaMrtJueuOwl6pPHZBrZCV3nzdGPL92wFLWnF6GDqISffJMj0SBZAfv07hwo2fqZBdsjw9rwlLkApvuWDWRrZA26K9tNVdsN6hwjZBoBZCFd4GBsb7Px8W5RB4ZD"


 */

// curl -X GET "https://graph.facebook.com/2751654314911195?fields=first_name,last_name,profile_pic&access_token=EAAkdTVETz5UBABiMRU4LChbImzlhRbIZBL76hdxdTZBQCrR8gm3iUlo2MKsdbzQJgYYX6cvdL5KaMrtJueuOwl6pPHZBrZCV3nzdGPL92wFLWnF6GDqISffJMj0SBZAfv07hwo2fqZBdsjw9rwlLkApvuWDWRrZA26K9tNVdsN6hwjZBoBZCFd4GBsb7Px8W5RB4ZD"