const Information = require('./Information');
class Response{
    static genQuickReply(text, quickReplies) {
        let response = {
            text: text,
            quick_replies: []
        };

        for (let quickReply of quickReplies) {
            response["quick_replies"].push({
                content_type: "text",
                title: quickReply["title"],
                payload: quickReply["payload"]
            });
        }

        return response;
    }

    static genTextReply(text){
        let response = {
            text: text
        };
        return response
    }

    static genGenericTemplate(meetings){
        let elements = [

        ];
        let ind=0;
        meetings.forEach(meeting=>{
            let element = {
                "title":meeting['name'].S,
                "image_url":meeting['profile_pic'].S,
                "subtitle":"Meeting set by " + meeting['name'].S + " at " + meeting['time'].S,

            };
            elements.push(element);

        });

        console.log(elements[0]);


        let response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": elements,
                    "image_aspect_ratio": "square"
                }
            }
        };


        return response;
    }

    static genPictureReply(url){
        let response = {
            "attachment":{
                "type":"image",
                "payload":{
                    "url":url, 
                    "is_reusable":true
                }
            }
        };
        return response 
    }

    static genAttachmentReply(){
        let response = {
            "attachment":{
                "type":"image",
                "payload":{
                    "attachment_id": "235306070839999"
                }
            }
        };
        return response;
    }

    static getAnimation( state ){
        let response;

        if( state === "on" ){
            response = {
                sender_action : "typing_on"
            }
        }

        else{
            response = {
                sender_action : "typing_off"
            }

        }

        return response;
    }

    static getFlightDetails( userData ){
        return Information.flightDetails( userData );
    }

    static genReminders(uid, reminders ){
        console.log(uid);
        let elements = [];

        for (let i=0;i<reminders.length;i++){
            if (i===3)break;
            let element = {
                "title":"Welcome!",
                "image_url":"https://nafiz6.github.io/bizbottFeuxdeux/notepad.png",
                "subtitle":"We have the right reminder for everyone.",
                "default_action": {
                    "type": "web_url",
                    "url": "https://nafiz6.github.io/bizbotteuxdeux/index.html?uid=" + uid+ "&path=" + JSON.stringify(reminders[i]) + "&ind=" + i,
                    "webview_height_ratio": "tall",
                    "messenger_extensions": true,
                    "fallback_url": "https://nafiz6.github.io/bizbotteuxdeux?uid=" + uid + "&path=" + JSON.stringify(reminders[i]) + "&ind=" + i
                },
                "buttons":[
                    {
                        "type":"postback",
                        "title":"Remove Reminder",
                        "payload": "DELETE_REMINDER_"+i
                    },{
                        "type":"web_url",
                        "title":"View Details",
                        "webview_height_ratio": "tall",
                        "messenger_extensions": true,
                        "fallback_url": "https://nafiz6.github.io/bizbotteuxdeux?uid=" + uid+"&path=" + JSON.stringify(reminders[i]) + "&ind=" + i
                    }
                ]
            };
            element['title'] = reminders[i]['title'];
            element['subtitle'] = reminders[i]['items'][0]['item1'];
            elements.push(element);
        }

        console.log(elements);



        console.log('_______________________________________--------------------------___________________________');

        let response = {
            "attachment": {             
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": elements
                }
            }
        };

        if (reminders.length){
            return this.genTextReply("Sorry, no reminders found!")
        }


        return response;
    }


    static genWebView(uid){
        let link = "https://nafiz6.github.io/bizbotteuxdeux/index.html?uid=" + uid;
        let response = {
            "attachment":{
                "type":"template",
                    "payload":{
                    "template_type":"button",
                        "text":"Create a reminder!",
                        "buttons":[
                        {
                            "messenger_extensions": true,
                            "type":"web_url",
                            "url": link,
                            "title":"Reminders",
                            "webview_height_ratio": "tall",
                            "fallback_url" : "https://nafiz6.github.io/bizbotteuxdeux/index.html?uid=" + uid
                        }
                    ]
                }
            }
        }
        return response;
    }

}

module.exports =  Response;