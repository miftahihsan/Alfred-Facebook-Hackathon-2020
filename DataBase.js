class DataBase{

    DataBase(){
        return {};
    }

    compile(  ){

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