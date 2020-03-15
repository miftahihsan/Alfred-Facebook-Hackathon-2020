const Response = require('./response');
const Replies = require('./replies.js');
const DynamoDB = require('./Dynamo');
class Nlp{

    /*
        @nlp -> nlp object 
        @userData -> The array extracted from HashMap
        @userMsg -> raw text sent by the user to the bot
    */
    compile( nlp, userData ){ /* Function not used */ }
    response( key, userData ){ /* Function not used */ }

    // Used to keep a check of confidence
    checkConfidence(nlp){
        if(nlp['intent'][0]['confidence'] < 0.8 ) return true;
    }

    // The bot uses this fucntion to decide its reply to the users text message
    /*
     *  @userData -> User information from he database
     *  @nlp -> Contains the NLP entities
     */
    findState( userData, nlp ){

        console.log(nlp);

        // no need to look into aything anymore if the confidence is low
        // if(nlp['intent'][0]['confidence'] < 0.7 ) return "default";

        // HAVE A LIST OF CONTEXTS TO PROCESS SEPARATELY INSTEAD OF NLP
        // NEW_REMINDER
        let payload;
        
        let branch = nlp['intent'][0]['value'];

        /*
         *  If NLP contains meeting meaning the user asked for a meeting 
         *  we take two different paths from here.
         *
         *  1)  If the user just asks for a meeting we ask him to specify the time.
         *  2)  If the user specifies the time along with the initial statement, 
         *      we directly deliver the meeting alert to every member of the database
         */
        if (branch === "meeting"){

            if( this.checkConfidence(nlp) ) return "default";

            payload="ANNOUNCEMENT_WHO";
            if ('datetime' in nlp){
                let time;
                if ('value' in nlp['datetime'][0]){

                    let t = nlp['datetime'][0]['value']+"";
                    t=t.split("T")[1].split("+")[0].split(":");
                    time = t[0]+":"+t[1];

                }
                else{

                    let t = nlp['datetime'][0]['values'].split("T")[1].split("+")[0].split(":");
                    time = t[0]+":"+t[1];

                }
                payload="TIME_"+time+"_PM";
                userData['state']=payload;
                return Replies.replies["TIME_11:00_AM"];
            }
        }
        /*
         *  Depending on what the user says we split it into two different paths
         *  
         *  1)  If the users statement contains both holiday and the key word APPLY
         *      with a high enough confidence level we directly submit thier application
         *      to the HR.
         * 
         *  2)  if the user only mentions holiday/leave we switch the users state
         *      to "HOLIDAYS_ASK_FOR_TIME" where we ask the user for his holiday/
         *      leave time and then submit his application.
         */
        else if( branch == "holiday" && nlp[branch][0]['value'] == "APPLY" 
                && nlp[branch][0]['confidence'] > 0.7 ){

            if( this.checkConfidence(nlp) ) return "default";

            // directly apply
            if( 'datetime' in nlp ){

                userData['state'] = "HOLIDAYS_APPLY";
                return Replies.replies[userData['state']];
            
            }
            // ask for date
            else{

                userData['state'] = "HOLIDAYS_ASK_FOR_TIME";
                return Replies.replies[userData['state']];
            
            }
                        
        }
        else if( userData['state'] == "HOLIDAYS_ASK_FOR_TIME" ){

            if( 'datetime' in nlp ) {

                userData['state'] = "HOLIDAYS_APPLY";
                return Replies.replies[userData['state']];

            } 
            else return "default"
            
        }
        /*
         *  Here the user gets a option to enter meeting time via text rather
         *  than using the quick replies.
         */
        else if( userData['state'] == "ANNOUNCEMENT_TIME"  ){

            let time;
            if (!('datetime' in nlp))return "default";

            if( 'value' in nlp['datetime'][0] ){
                let t = nlp['datetime'][0]['value']+"";
                t=t.split("T")[1].split("+")[0].split(":");
                time = t[0]+":"+t[1];
            }
            else{
                let t = nlp['datetime'][0]['values'].split("T")[1].split("+")[0].split(":");
                time = t[0]+":"+t[1];
            }

            payload="TIME_"+time+"_PM";
            userData['state']=payload;
            return Replies.replies["TIME_11:00_AM"];

        } 
        else{
            /*
             *  If confidence lvl is < 0.7 we return a default string i.e. stay on the current state
             *  and prompt the user the states default msg again.            
             */
            if( this.checkConfidence(nlp) ) return "default";
            if (!(branch in nlp)){
                payload = branch.toUpperCase();
            }
            else payload = nlp[branch][0]['value'];
        }
        userData['state']  = payload;

        //userData['state'] = "MENU";
        /*
         *  If the Intent is in replies then we fetch it from the Replies.replies and send it to the user
         *  Else we search it from the policy and look if that contains the Intent
         */
        if (payload in Replies.replies) return Replies.replies[userData['state']];
        else if (payload in Replies.policy){
            let btn = [Response.genQuickReply("What else would you like to know about? ", Replies.button["KNOWLEDGE_BTN"] )];

            let res = Replies.policy[userData['state']].concat(btn);

            return res;
        }
        else{
            return "default";
        }

    }

}


module.exports = Nlp;