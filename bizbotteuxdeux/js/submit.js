let uid;

window.onload = init;

window.extAsyncInit = function() {
  let title = document.getElementById("title");

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

function findGetParameter(parameterName) {
  var result = null,
    tmp = [];
  var items = location.search.substr(1).split("&");
  for (var index = 0; index < items.length; index++) {
    tmp = items[index].split("=");
    if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  }
  return result;
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
        "uid" : findGetParameter("uid"),
        "title" : document.getElementById('title').value,
        "items": getItem()
      })
      }
    );
    console.log('Completed!', response);
    location.href = "https://www.messenger.com/closeWindow/display_text=remindersaved";
    MessengerExtensions.requestCloseBrowser(function success() {
      // webview closed
    }, function error(err) {
      // an error occurred
    });
  } catch(err) {
    console.error(`Error: ${err}`);
  }
});



