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
        console.log(nlp);
    }


    findState( userData, message ){
        // HAVE A LIST OF CONTEXTS TO PROCESS SEPARATELY INSTEAD OF NLP
        // NEW_REMINDER



        userData['state'] = "MENU";
        return Replies.replies[userData['state']];

    }
    
    response( key, userData ){


    }

}

module.exports = Nlp;