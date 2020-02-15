
/*
    # DataBase Design
    -----------------------
    @index 0 -> from
    @index 1 -> to
    @index 2 -> date
    @index 3 -> timestamp
 */

class DataBase{

    // var length;

    DataBase(){
        return {};
    }

    register( hashMap, id ){ hashMap[id] = new Array(4); }

    isEmpty( array ){
        for( var i = 0; i < array.length; i++ ){
            if( array[i] != null ) return false;
        }
        return true;
    }


    insert( userData, key, value ){
        
        if( key == "from" ){
            userData[0] = value;
        }
        else if( key == "to" ){
            userData[1] = value;
        }
        else if( key == "date" ){
            userData[2] = value;
        }
        else if( key == "time" ){
            userData[3] = value;
        }
    }

}

module.exports = DataBase;