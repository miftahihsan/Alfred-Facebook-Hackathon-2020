const Response = require('./response');
class Nlp{

    /*
        @nlp -> nlp object 
        @userData -> The array extracted from HashMap
        @userMsg -> raw text sent by the user to the bot
    */
    compile( nlp, userData, database ){        
        
        if( 'location' in nlp ){
            if (nlp['location'][0]['confidence'] > 0.7){
                if( userData['state'] == 'destination' ){
                    database.insert( userData, "destination", nlp['location'][0]['value'] );
                }
                else if( userData['state'] == 'origin' ){
                    database.insert( userData, "origin", nlp['location'][0]['value'] );
                }
            } 
        }

        if( 'destination' in nlp ){
            console.log("In Destination");
            console.log(nlp['destination'][0]['value']);
            console.log(nlp['destination'][0]['confidence']);
            if (nlp['destination'][0]['confidence'] > 0.7) database.insert( userData, "destination", nlp['destination'][0]['value'] );
            console.log(userData);
        }

        if( 'origin' in nlp ){
            console.log("In Origin");
            console.log(nlp['origin'][0]['value']);
            if (nlp['origin'][0]['confidence'] > 0.7)database.insert( userData, "origin", nlp['origin'][0]['value'] );
            console.log(userData);
        }

        if( 'datetime' in nlp ){
            console.log("In Date And Time");
            console.log(nlp['datetime'][0]['value']);
            var dateAndTime = nlp['datetime'][0]['value'].split('T');

            if (nlp['datetime'][0]['confidence'] > 0.7)
            {
                if ( userData['state'] == "returnDate" ){
                    database.insert( userData, "returnDate", dateAndTime[0] );

                }else{
                    database.insert( userData, "date", dateAndTime[0] );
                }

            }
            console.log("Time is = " + nlp['datetime'][0]['value'] + " " + nlp['datetime'][0]['grain'] );
        }

        if ( 'intent' in nlp){
            console.log("Intent");
            console.log(nlp['intent'][0]['value']);      // 0th index has highest confidence
            if (nlp['intent'][0]['confidence'] > 0.7) database.insert( userData, "intent", nlp['intent'][0]['value']);
        }

        console.log( userData );
    }


    findState( userData ){

        var array = ["destination", "date", "origin", "pickFlight", "ifReturn", "returnDate", "returnFlight", "confirm"];

        if( !( "intent" in userData ) ){
            userData['state'] = 'intent';
            return this.response( userData['state'], userData );
        }
        
        for( var i = 0; i < array.length; i++ ){

            console.log("userData = " + userData);
            console.log("State of this loop = " + array[i] + " " + userData['state'] + " i = " + i);
            console.log("in userData = " + ( array[i] in userData ) )

            if( !( array[i] in userData ) ){
                userData['state'] = array[i];
                console.log("State of this loop pre breaking = " + array[i] + " " + userData['state'] + " i = " + 0);
                return this.response( userData['state'], userData );
            }

            if( array[i] == "ifReturn"){
               if ( userData[array[i]] == false ) break;
            }

        }

        userData['state'] = 'confirm';
        return this.response( 'confirm', userData );

    }
    
    response( key, userData ){

        var text,response ;

        // state
        if( key == "initiate" ){
            text = "HEY! I am Get Schwifty Bot, here at your service to book you hotels and flights of your choice! \n\nLets Get Started! 🎉 🎉 🎉\n\nWould you Like to book a flight or a hotel?"
            response = Response.genTextReply(text);
        }
        else if( key == "confirm" ){
            text = 'You are travelling from\n' + userData['origin']  + ' to ' + userData['destination'] +
                    ' \n\nTime of Flight\n' + userData['date'] + ' ' + userData['time'];
            if( userData['ifReturn'] == true ){
                text += '\n\nReturn Flight = ' + userData['returnDate'] + ' ' + userData['returnTime'] + '\n\nWould you like to confirm your booking?';
            }

            response = Response.genTextReply(text)

            // response = Response.genWebView(userData['destination'],userData['origin'],userData['date']);
        }
        // intent -> can be either flight or hotel
        else if( key == 'intent' ){
            text = "Would you Like to book a flight or a hotel?"
            response = Response.genTextReply(text);
        }
        else if( key == 'origin' ){
            text = 'Which CITY are you from?'
            response = Response.genTextReply(text);
        }
        else if( key == 'destination' ){
            text = 'Which CITY/STATE are you headed?'
            response = Response.genTextReply(text);
        }
        else if( key == 'date' ){
            text = 'When will you be heading out?'
            response = Response.genTextReply(text);
        }
        else if( key == 'time' ){
            text = 'What time would you like to book the ticket for?'
            response = Response.genTextReply(text);
        }
        else if( key == "pickFlight" ){

            response = Response.getFlightView( userData['destination'], userData['origin'], userData['date']);

            console.log("HELLO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! in pickFlight");
            
            console.log( response );
            

        }
        else if( key == "returnFlight" ){
            response = Response.getFlightView( userData['origin'], userData['destination'], userData['returnDate']);
            console.log("HELLO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! in returnFlight");
        }
        else if( key == "ifReturn" ){
            text = 'Would you like a return ticket?'
            response = Response.genQuickReply(text, [
                {
                    title: "Yes",
                    payload: "YES"
                },
                {
                    title: "No",
                    payload: "NO"
                }
            ]);
        }
        else if( key == 'returnDate' ){
            text = 'When would you like to come back?'
            response = Response.genTextReply(text);
        }
        // else if( key == 'returnTime' ){
        //     text = 'At what time would you like to book the return ticket?'
        //     response = Response.genTextReply(text);
        // }

        return response;

    }

}

module.exports = Nlp;