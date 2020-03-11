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

    checkConfidence(nlp){
        if(nlp['intent'][0]['confidence'] < 0.7 ) return true;
    }

    findState( userData, nlp ){

        console.log(nlp);

        // no need to look into aything anymore if the confidence is low
        // if(nlp['intent'][0]['confidence'] < 0.7 ) return "default";

        // HAVE A LIST OF CONTEXTS TO PROCESS SEPARATELY INSTEAD OF NLP
        // NEW_REMINDER
        let payload;
        
        let branch = nlp['intent'][0]['value'];

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
            if( this.checkConfidence(nlp) ) return "default";
            if (!(branch in nlp)){
                payload = branch.toUpperCase();
            }
            else payload = nlp[branch][0]['value'];
        }
        userData['state']  = payload;

        //userData['state'] = "MENU";
        if (payload in Replies.replies) return Replies.replies[userData['state']];
        else return Replies.policy[userData['state']];

    }
    
    response( key, userData ){


    }



}


module.exports = Nlp;