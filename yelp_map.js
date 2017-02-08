// showMap = function(result, tooltip) {
//     var address = result.formatted_address;
//     var location = result.geometry.location;
//
//     var map = new google.maps.Map(document.getElementById("map"), {
//       zoom: 15,
//       center: location,
//       mapTypeId: google.maps.MapTypeId.ROADMAP,
//       mapTypeControl: false
//     });
//     var marker = new google.maps.Marker({
//       position: location,
//       map: map
//     });
//     var infowindow = new google.maps.InfoWindow({
//       content: tooltip.html()
//     });
//     infowindow.open(map, marker);
//     google.maps.event.addListener(marker, 'click', function() {
//       infowindow.open(map, marker);
//     });
//
//     $('#external_map').click(function() {
//       chrome.tabs.create({
//         url: 'http://maps.google.com?near=' + address
//       });
//       window.close();
//       return false;
//     });
//   };

// getting the current url
// chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
//     var url = tabs[0].url;
// });
//http://api.yelp.com/v2/search//
//permissions file with activeTab, storage, tabs, http://*/*, https://*/*, http://www.yelp.com/, http://maps.google.com/

// chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
//     var url = tabs[0].url;
//     console.log(url);
// });

// chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
//     var url = tabs[0].url;
//     alert(url);
// });



// var head = document.getElementsByTagName('head')[0];
// var NewScript = document.createElement("script");
//         NewScript.type = "text/javascript";
//         NewScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCO5cb-NtAMZZOuPj6QpqekaXtoUrILSnw&callback=initMap";
//         head.appendChild(NewScript);
function initialize() {

  var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
  var mapOptions = {
    zoom: 4,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title:"Here's the stuff!"
  });
}
google.maps.event.addDomListener(window, 'load', initialize);

// function renderMap(latitude, latitude) {
//   var map = new GMap2(document.getElementById('map_canvas'));
//   map.setCenter(new GLatLng(latitude, latitude), 13);
//   var marker = new GMarker(new GPoint(lng, lat));
//   map.addOverlay(marker);
// }
