class Nlp{

    /*
        @nlp -> nlp object 
        @userData -> The array extracted from HashMap
        @userMsg -> raw text sent by the user to the bot
    */
    compile( nlp, userData, userMsg, database ){
        if( 'destination' in nlp ){
            console.log("In Destination");
            console.log(nlp['destination'][0]['value']);
            // database( userData, "destination", nlp['destination']['value'] );
        }
        if( 'origin' in nlp ){
            console.log("In Origin");
            console.log(nlp['origin'][0]['value']);
            // database( userData, "origin", nlp['origin'['value']] );
        }
        if( 'datetime' in nlp ){
            console.log("In Date And Time");
            console.log(nlp['datetime'][0]['value']);
            // var dateAndTime = nlp['datetime'][0]['value'].split('T');

            // database.insert( userData, "date", dateAndTime[0] );
            // database.insert( userData, "time", dateAndTime[1] );
            // console.log("Time is = " + nlp['datetime'][0]['value'] + " " + nlp['datetime'][0]['grain'] );
        }

        console.log( userData );
    }

    /*
        @nlp -> nlp object 
        @name -> name represents tags from the JSON object example : greetings,
                    location, timestamp etc.
    */
    checkGreetings( nlp, name ){
        return nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
    }

    response( data ){
        
    }

}

module.exports = Nlp;