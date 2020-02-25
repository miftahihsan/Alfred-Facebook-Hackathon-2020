
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
    }

}

module.exports = DataBase;