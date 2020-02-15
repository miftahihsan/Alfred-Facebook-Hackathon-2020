class Nlp{

    compile( nlp, dataBase ){
        if( 'location' in nlp ){
            console.log("Location is = " + nlp['location'] + " " + nlp['location']['value'] );
        }
        if( 'datetime' in nlp ){
            console.log("Time is = " + nlp['datetime']);
        }
    }

    checkGreetings( nlp, name ){
        return nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
    }

}

module.exports = Nlp;