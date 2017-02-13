var meta = document.getElementsByTagName('meta');

// iterate through the different meta tags and save lat and long
let lat;
let lng;
for ( let i = 0; i < meta.length; i ++) {
    if (meta[i].getAttribute("property") === "airbedandbreakfast:location:latitude") {
        lat = meta[i].getAttribute("content");
    } else if ( meta[i].getAttribute("property") === "airbedandbreakfast:location:longitude") {
        lng = meta[i].getAttribute("content");
    }
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({lat: lat, lng: lng});
  });
