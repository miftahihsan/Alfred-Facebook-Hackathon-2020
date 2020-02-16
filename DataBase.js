
/*
    # DataBase Design
    -----------------------
    @index 0 -> origin
    @index 1 -> destination
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
        
        if( key == "origin" ){
            userData[0] = value;
            console.log("value is = " + value);
            console.log("userData[0] = " + userData[0]);
        }
        else if( key == "destination" ){
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