
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

class DataBase{

    // var length;

    DataBase(){
        return {};
    }

    register( DataBase, id ){ DataBase[id] = {}; }

    isEmpty( array ){
        for( var i = 0; i < array.length; i++ ){
            if( array[i] != null ) return false;
        }
        return true;
    }


    insert( userData, key, value ){
        
        userData[key] = value;

        // if( key == "origin" ){
        //     userData[0] = value;
        // }
        // else if( key == "destination" ){
        //     userData[1] = value;
        // }
        // else if( key == "date" ){
        //     userData[2] = value;
        // }
        // else if( key == 'time' ){
        //     userData[3] = value;
        // }
        // else if ( key == "ifReturn"){
        //     userData[4] = value;
        // }
        // else if( key == "returnDate" ){
        //     userData[5] = value;
        // }
        // else if( key == "returnTime" ){
        //     userData[6] = value;
        // }
        // else if ( key == "state"){
        //     userData[7] = value;
        // }
        // else if (key == "intent"){
        //     userData[8] = value;
        // }
    }

}

module.exports = DataBase;