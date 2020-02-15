
/*
    # DataBase Design
    -----------------------
    @index 0 -> from
    @index 1 -> to
    @index 2 -> timestamp
 */

class DataBase{

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

}

module.exports = DataBase;