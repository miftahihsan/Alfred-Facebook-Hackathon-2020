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
                database.insert( userData, "date", dateAndTime[0] );
                database.insert( userData, "time", dateAndTime[1] );
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
        // var index = {
        //     "intent" : 0,
        //     "destination" : 1,
        //     "date" : 2,
        //     "time" : 3,
        //     "origin" : 4,
        //     "ifReturn" : 5,
        //     "returnDate" : 6,
        //     "returnTime" : 7
        // }

        var array = ["intent", "destination", "date", "time", "origin", "ifReturn", "returnDate", "returnTime", "confirm"];

        for( var i = 0; i < array.length; i++ ){

            console.log("userData = " + userData);
            console.log("State of this loop = " + array[i] + " " + userData['state'] + " i = " + i);
            console.log("in userData = " + ( array[i] in userData ) )

            if( !( array[i] in userData ) ){
                userData['state'] = array[i];
                console.log("State of this loop pre breaking = " + array[i] + " " + userData['state'] + " i = " + 0);
                return this.response( userData['state'], userData );
            }

            if( array[i] == "ifReturn" &&  userData[array[i]] == false ) break;
        }

        userData['state'] = 'confirm';
        return this.response( 'confirm', userData );

    }
    
/*
    # DataBase Design
    -----------------------
    user_id : {
        state,
        intent,
        origin,
        destination,
        date,
        time,
        ifReturn,
        returnDate,
        returnTime,
    }
*/
    response( key, userData ){

        var res = '';

        // state
        if( key == "initiate" ){
            res = "HEY! I am Get Schwifty Bot, here at your service to book you hotels and flights of your choice! \n\nLets Get Started! 🎉 🎉 🎉\n\nWould you Like to book a flight or a hotel?"
        }
        else if( key == "confirm" ){
            res = 'You are going to ' + userData['destination']  + ' from ' + userData['origin'] + 
                    ' \n\nTime of Flight = ' + userData['date'] + ' ' + userData['time'];
            if( userData[4] == true ){
                res += '\n\nReturn Flight = ' + userData['returnDate'] + ' ' + userData['returnTime'] + '\n\nWould you like to confirm your booking?';
            }
        }
        // intent -> can be either flight or hotel
        else if( key == 'intent' ){
            res = "Would you Like to book a flight or a hotel?"
        }
        else if( key == 'origin' ){
            res = 'What is your current location?'
        }
        else if( key == 'destination' ){
            res = 'Where are you heading to?'
        }
        else if( key == 'date' ){
            res = 'When will you be heading out?'
        }
        else if( key == 'time' ){
            res = 'What time would you like to book the ticket for?'
        }
        else if( key == "ifReturn" ){
            res = 'Would you like a return ticket?'
        }
        else if( key == 'returnDate' ){
            res = 'When would you like to come back?'
        }
        else if( key == 'returnTime' ){
            res = 'At what time would you like to book the return ticket?'
        }

        return res;

    }

}

module.exports = Nlp;