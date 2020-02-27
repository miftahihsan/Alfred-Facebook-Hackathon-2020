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

}

// text = 'Would you like a return ticket?'
// response = Response.genQuickReply(text, [
//     {
//         title: "Yes",
//         payload: "YES"
//     },
//     {
//         title: "No",
//         payload: "NO"
//     }
// ]);

module.exports = Nlp;