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
            sender_action : "typing_on",
            sender_action : "typing_off",
            text: text
        };
        return response
    }

    static getAnimation( state ){
        let response;

        if( state == "on" ){
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

    static getFlightView( to, from, date ){
        console.log('_______________________________________--------------------------___________________________');
        console.log( Information.flightInformation(to, from, date) );
        
        let response = {
            "attachment": {             
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": Information.flightInformation(to, from, date)
                }
            }
        }

        return response;
    }


    static genWebView(to, from, date){
        var link = "https://booking.kayak.com/flights/"+ from + "-" + to+"/"+date;
        let response = {
            "attachment":{
                "type":"template",
                    "payload":{
                    "template_type":"button",
                        "text":"Book Now!",
                        "buttons":[
                        {
                            "type":"web_url",
                            "url": link,
                            "title":"Book Now!",
                            "webview_height_ratio": "full"
                        }
                    ]
                }
            }
        }
        return response;
    }

}

module.exports =  Response;