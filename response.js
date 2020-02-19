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

    static getFlightView( to, from, date ){
        let response = {
            "attachment": {             
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": from + " to " + to,
                            "subtitle": "Date : " + date + "\nTime : 11:00\nDuration 00:45\nPrice : 40$",
                            "image_url": "flight.jpeg",
                            "buttons": [
                                {
                                "type": "postback",
                                "title": "Book Flight!",
                                "payload": "Book Flight",
                                }
                            ],
                        },
                        {
                            "title": from + " to " + to,
                            "subtitle": "Date : " + date + "\nTime : 11:00\nDuration 00:45\nPrice : 40$",
                            "image_url": "flight.jpeg",
                            "buttons": [
                                {
                                "type": "postback",
                                "title": "Book Flight!",
                                "payload": "Book Flight",
                                }
                            ],
                        },
                        {
                            "title": from + " to " + to,
                            "subtitle": "Date : " + date + "\nTime : 11:00\nDuration 00:45\nPrice : 40$",
                            "image_url": "flight.jpeg",
                            "buttons": [
                                {
                                "type": "postback",
                                "title": "Book Flight!",
                                "payload": "Book Flight",
                                }
                            ],
                        }
                    ]
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