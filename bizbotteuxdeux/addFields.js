
var i = 1;

function addThings(event){

        const elem = document.createElement('div');
        elem.setAttribute('class', 'input-field col s12');
        elem.setAttribute('id', 'dynamicBox' + i);

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
        box.setAttribute('id', 'item');
        box.setAttribute('type', 'text');

        
        elem.appendChild(cross);
        elem.appendChild(box);

        document.getElementById('dynamic').append(elem);

        i++;
}

function removeThings(event){
        document.getElementById('dynamicBox'+event).remove();
}


// <button class = "remove" type="button" > <i class="fa fa-window-close" aria-hidden="true"></i> </button>

// alert('Hello');