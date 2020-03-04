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

    async static genAttachmentReply(){
        let response = {
            "attachment":{
                "type":"image",
                "payload":{
                    "attachment_id": "235306070839999"
                }
            }
        };
        return await new Promise(response);
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
        console.log(reminders);
        let elements = [

        ];
        let ind=0;
        reminders.forEach(reminder=>{
            let element = {
                "title":"Welcome!",
                "image_url":"https://nafiz6.github.io/bizbotteuxdeux/notepad.png",
                "subtitle":"We have the right hat for everyone.",
                "default_action": {
                    "type": "web_url",
                    "url": "https://nafiz6.github.io/bizbotteuxdeux/index.html?uid=" + uid+ "&path=" + JSON.stringify(reminder) + "&ind=" + ind,
                    "webview_height_ratio": "tall",
                    "messenger_extensions": true,
                    "fallback_url": "https://nafiz6.github.io/bizbotteuxdeux?uid=" + uid
                },
                "buttons":[
                    {
                        "type":"web_url",
                        "url":"https://nafiz6.github.io/bizbotteuxdeux/index.html?uid=" + uid + "&path=" + JSON.stringify(reminder) + "&ind=" + ind,
                        "title":"View Details",
                        "webview_height_ratio": "tall",
                        "messenger_extensions": true,
                        "fallback_url": "https://nafiz6.github.io/bizbotteuxdeux?uid=" + uid
                    }
                ]
            };
            element['title'] = reminder['title'];
            element['subtitle'] = reminder['items']['item1'];
            elements.push(element);
            ind++;
        });



        console.log('_______________________________________--------------------------___________________________');

        let response = {
            "attachment": {             
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": elements
                }
            }
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
                            "fallback_url" : "https://nafiz6.github.io/bizbotteuxdeux"
                        }
                    ]
                }
            }
        }
        return response;
    }

}

module.exports =  Response;