const Response = require('./response');
const Replies = require('./replies.js');
const DynamoDB = require('./Dynamo');
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
        let payload;
        console.log(nlp);
        let branch = nlp['intent'][0]['value'];
        if (branch === "meeting"){
            payload="ANNOUNCEMENT_WHO";
            if ('datetime' in nlp){
                let time;
                if ('value' in nlp['datetime']){

                    let t = nlp['datetime']['value'].split("T")[1].split("+")[0].split(":");
                    time = "TIME_" + t[0]+":"+t[1]+"_PM";

                }
                else{

                    let t = nlp['datetime']['values'].split("T")[1].split("+")[0].split(":");
                    time = "TIME_" + t[0]+":"+t[1]+"_PM";

                }
                payload="TIME_"+time+"_PM";
            }
        }
        else{payload = nlp[branch][0]['value'];}
        userData['state']  = payload;

        //userData['state'] = "MENU";
        if (payload in Replies.replies)return Replies.replies[userData['state']];
        else return Replies.policy[userData['state']];

    }
    
    response( key, userData ){


    }



}


module.exports = Nlp;