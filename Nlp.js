class Nlp{

    /*
        @nlp -> nlp object 
        @userData -> The array extracted from HashMap
        @userMsg -> raw text sent by the user to the bot
    */
    compile( nlp, userData, userMsg ){
        if( 'location' in nlp ){
            console.log( "length = " + nlp['location'].length ); 
            console.log("Location is = " + nlp['location'] + " " + nlp['location'][0]['value'] );

            if( nlp['location'].length == 2 ){
                userData[0] = nlp['location'][0]['value'];
                userData[1] = nlp['location'][ nlp['location'].length - 1 ]['value'];
            }
            else if( nlp['location'].length == 1 ){
                if( userMsg.includes('to') ) userData[1] = nlp['location'][ nlp['location'].length - 1 ]['value'];
                else if ( userMsg.includes('from') ) userData[1] = nlp['location'][ nlp['location'].length - 1 ]['value'];
                
                // defaule no relevant information is provided
                // thus nothing will be registered and the user
                // will be asked to re-enter locaion with the
                // proper format, which includes to or from
                // key words. 
            }
        }
        if( 'datetime' in nlp ){
            console.log("Time is = " + nlp['datetime']);
        }
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