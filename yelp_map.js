alert(1);
let lat = "";
let lng = "";

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    console.log(response);
    lat = response.lat;
    lng = response.lng
    console.log(lat, lng);
    initialize(lat, lng);
  });
});



// var Yelp = require('yelp');
function initialize(latitude, longitude) {
  var myLatlng = new google.maps.LatLng(latitude, longitude);
  var mapOptions = {
    zoom: 13,
    center: myLatlng
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title:"Here's the stuff!"
  });
}
// google.maps.event.addDomListener(window, 'load', initialize);

//
// var yelp = new Yelp({
//   consumer_key: 'gROY6FtEZekeyCt-XVlNyQ',
//   consumer_secret: '3_sHldcV2QelwHxXT7AuZETZV94',
//   token: '3KS1I8bsUbOPNxRtOPxvNJInBCwYLhCA',
//   token_secret: 'p4Z0YkqXGyYozsmP6k6ROFnlCiU',
// });
//
// yelp.search({ term: 'food', location: 'Montreal' })
// .then(function (data) {
//   console.log(data);
// })
// .catch(function (err) {
//   console.error(err);
// });
