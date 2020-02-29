let uid;

window.onload = init;

window.extAsyncInit = function() {
  MessengerExtensions.getContext('2565492700336021',
    function success(thread_context){
      uid = thread_context["psid"];
    },
    function error(err){
      // error
    }
  );
};

function init() {
  var url_string = decodeURIComponent(window.location.href);

  let arr = url_string.split("=");

  if( arr.length === 1 ){
    return;
  }

  url_string = decodeURIComponent(arr[1]);

  var response = JSON.parse(url_string);

  if( response['title'].length > 0 ){
    document.getElementById('title').value = response['title'];
  }

  console.log(response['items']);
  var index = 1000;

  Object.entries(response['items']).forEach(([key, value]) => {
    if( value.length > 0 ){
      addOnPost(value, index);
      index++;
    }
    // console.log( key + " " + value);
  });
}

const button = document.getElementById('post-btn');

button.addEventListener('click', async _ => {

  try {
    const response = await fetch('https://getschwifty.herokuapp.com/userList', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify({
        "uid" : uid,
        "title" : document.getElementById('title').value,
        "items": getItem()
      })
      }
    );
    console.log('Completed!', response);
    MessengerExtensions.requestCloseBrowser(function success() {
      // webview closed
    }, function error(err) {
      // an error occurred
    });
  } catch(err) {
    console.error(`Error: ${err}`);
  }
});



