
var i = 1;

function addThings(event){

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

        // console.log(response);
        return response;
}


// <button class = "remove" type="button" > <i class="fa fa-window-close" aria-hidden="true"></i> </button>

// alert('Hello');