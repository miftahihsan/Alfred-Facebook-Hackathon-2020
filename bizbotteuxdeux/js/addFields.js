
var i = 1;

function addThings(){

        const elem = document.createElement('div');
        elem.setAttribute('class', 'input-field col s12');
        elem.setAttribute('id', 'dynamicBox'+i);

        const cross = document.createElement('button');
        cross.setAttribute('class', 'remove');
        cross.setAttribute('type', 'button');
        cross.setAttribute('id', i);
        cross.setAttribute('onclick', 'removeThings('+i+')')

        const icon = document.createElement('i');
        icon.setAttribute('class', 'fa fa-window-close');
        icon.setAttribute('aria-hidden', 'true');

        cross.appendChild(icon);

        const box = document.createElement('input');
        box.setAttribute('placeholder', 'Add an Item');
        box.setAttribute('id', 'item'+i);
        box.setAttribute('type', 'text');

        
        elem.appendChild(cross);
        elem.appendChild(box);

        document.getElementById('dynamic').append(elem);

        i++;
        getItem();
}

function removeThings(event){
        document.getElementById('dynamicBox'+event).remove();
}

function addOnPost(value, index){

        // key = key.substring(4, key.length);

        const elem = document.createElement('div');
        elem.setAttribute('class', 'input-field col s12');
        elem.setAttribute('id', 'dynamicBox'+index);

        const cross = document.createElement('button');
        cross.setAttribute('class', 'remove');
        cross.setAttribute('type', 'button');
        cross.setAttribute('id', index);
        cross.setAttribute('onclick', 'removeThings('+index+')')

        const icon = document.createElement('i');
        icon.setAttribute('class', 'fa fa-window-close');
        icon.setAttribute('aria-hidden', 'true');

        cross.appendChild(icon);

        const box = document.createElement('input');
        box.setAttribute('placeholder', 'Add an Item');
        box.setAttribute('id', 'item'+index);
        box.setAttribute('type', 'text');
        box.value = value;

        
        elem.appendChild(cross);
        elem.appendChild(box);

        document.getElementById('dynamic').append(elem);
}

function getItem(){

        let arr = [];

        $('#dynamic > div').map(function() {
                arr.push(this.id);
        });

        let temp = [];

        for( var i = 0; i < arr.length; i++ ){
                $('#'+arr[i]+' :input').map(function() {
                        temp.push(this.id); 
                }); 
        }
 
        let response = {};

        for( var i = 0; i < temp.length; i++ ){
                if( i % 2 != 0 ) {
                        response[temp[i]] = document.getElementById(temp[i]).value;
                }
        }

        return response;
}

