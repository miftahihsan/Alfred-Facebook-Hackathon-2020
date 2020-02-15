class DataBase{

    DataBase(){
        return {};
    }

    register(hashMap, id){
        hashMap[id] = new Array(4);
    }

}

module.exports = DataBase;