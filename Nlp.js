const Response = require('./response');
const Replies = require('./replies.js');
const Dynamo = require('./Dynamo');
class Nlp{

    /*
        @nlp -> nlp object 
        @userData -> The array extracted from HashMap
        @userMsg -> raw text sent by the user to the bot
    */
    compile( nlp, userData ){


    }


    findState( userData, nlp ){
        // HAVE A LIST OF CONTEXTS TO PROCESS SEPARATELY INSTEAD OF NLP
        // NEW_REMINDER

        console.log(nlp);
        let branch = nlp['intent'][0]['value'];
        let payload = nlp[branch][0]['value'];
        userData['state']  = payload;

        //userData['state'] = "MENU";
        if (payload in Replies.replies)return Replies.replies[userData['state']];
        else return Replies.policy[userData['state']];

    }
    
    response( key, userData ){


    }

}

module.exports = Nlp;