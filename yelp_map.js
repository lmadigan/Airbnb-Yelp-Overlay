// var oauthSignature = require('oauth-signature');
// var n = require('nonce')();
// var request = require('request');
// var qs = require('querystring');
// var _ = require('lodash');


let lat = "";
let lng = "";
const markers = [];
let yelpMap = {};
let myLatlng = "";
let lats = [];
let longs = [];
let avgLat = 0;
let avgLong = 0;
let activeWindow = "";

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    lat = response.lat;
    lng = response.lng;
    myLatlng = new google.maps.LatLng(lat, lng);
    console.log(myLatlng);
    geocodeLatLng();
  });
});



// // var Yelp = require('yelp');
function initialize(body) {
  console.log(body);
  var mapOptions = {
    zoom: 14,
    center: myLatlng
  };
  yelpMap = new google.maps.Map(document.getElementById("map"), mapOptions);


  var marker = new google.maps.Marker({
      position: myLatlng,
      icon: './icons/blue_pin.png',
      map: yelpMap,
      title:"Here's the stuff!"
  });

  markers.push(marker);

  for(let i = 0; i < body.length; i++){
    addPlace(body[i]);
  }

}

function addPlace( place ) {
  console.log("adding place");
  let la = place.location.coordinate.latitude;
  let lo = place.location.coordinate.longitude;
    longs.push(lo);
    var marker = new google.maps.Marker({
        position: {lat: la, lng: lo},
        map: yelpMap,
        title: place.name,
        url: place.url
    });

    var address1 = place.location.display_address[0] !== undefined ? place.location.display_address[0] : "";
    var address2 = place.location.display_address[1] !== undefined ? place.location.display_address[1] : "";


    var contentString = `<div id="content">`+
      '<div id="siteNotice">'+
      `<h1 id="firstHeading" class="firstHeading">${place.name}</h1>`+
      '<div id="bodyContent">'+
      `<img src=${place.rating_img_url} alt="stars" height="20" width="105">` +
      `<h3>${place.review_count} reviews </h3>` +
      `<h2 id="categories">${place.categories}</h2>` +
      `<h2>${address1}</h2>` +
      `<h2>${address2}</h2>` +
      '</div>'+
      '</div>'+
      '<div id="photo-content">' +
      `<img src=${place.image_url} alt="image" height="125" width="120">` +
      '</div>' +
      '</div>';

    var infowindow = new google.maps.InfoWindow({
    content: contentString
  });



    $('#content').click(function(){
      chrome.tabs.sendMessage({greeting: "newTab", url: place.url }, function(response) {
          console.log(response);
        });
        console.log("requesting");
      });

    // Attaching a click event to the current marker
    google.maps.event.addListener( marker, "click", function(e) {
          if (activeWindow !== "") {
            activeWindow.close();
          }
          infowindow.open( yelpMap, marker );
          activeWindow = infowindow ;
    });

    google.maps.event.addListener( infowindow, "click", function(e) {
           window.location.href=`${place.url}`;
           console.log("redirect");
    });

}

function calculateAverage() {
  for(let i = 0; i < lats.length; i++) {
    avgLat += lats[i];
    avgLong += longs[i];
  }

  avgLat = (avgLat / lats.length);
  avgLong = (avgLong/ lats.length);
  console.log(avgLat, avgLong);
}

function loadURL(marker) {
  console.log(marker.url);
    return function () {
        window.location.href = marker.url;
    };
}


function geocodeLatLng() {
    var geocoder = new google.maps.Geocoder;
      let location = "";
      geocoder.geocode({'location': myLatlng}, function(results, status) {
        if (status === 'OK') {
          if (results[1]) {
            location = results[1].formatted_address;
            setYelp(location, yelpMap);
          } else {
            alert('No results found');
          }
        } else {
          alert('Geocoder failed due to: ' + status);
        }
      });

    }
// google.maps.event.addDomListener(window, 'load', initialize);


var tokens = {
  YELP_CONSUMER_KEY: 'gROY6FtEZekeyCt-XVlNyQ',
  YELP_CONSUMER_SECRET: '3_sHldcV2QelwHxXT7AuZETZV94',
  YELP_TOKEN: 'oUEY96ItfHYXqzFeZ0MDwgUsmn0L6atQ',
  YELP_TOKEN_SECRET: 'bZ5hmABbBKmgnpfJ4tNuF2T1IJs',
};


/* Function for yelp call
 * ------------------------
 * set_parameters: object with params to search
 * callback: callback(error, response, body)
 */

//
function setYelp(location) {
  /* The type of request */
  var httpMethod = 'GET';

  /* The url we are using for the request */
  var url = 'https://api.yelp.com/v2/search';

  /* We can setup default parameters here */

  var default_parameters = {
    location: location,
    sort: '2',
    term: 'food',
    radius_filter: '1000'
  };

  /* We set the require parameters here */
  var required_parameters = {
    oauth_consumer_key : tokens.YELP_CONSUMER_KEY,
    oauth_token : tokens.YELP_TOKEN,
    oauth_nonce : n(),
    oauth_timestamp : n().toString().substr(0,10),
    oauth_signature_method : 'HMAC-SHA1',
    oauth_version : '1.0'
  };
//
  /* We combine all the parameters in order of importance */
  var parameters = _.assign(default_parameters, required_parameters);

  /* We set our secrets here */
  var consumerSecret = tokens.YELP_CONSUMER_SECRET;
  var tokenSecret = tokens.YELP_TOKEN_SECRET;

  /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
  /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
  var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

  /* We add the signature to the list of paramters */
  parameters.oauth_signature = signature;

  /* Then we turn the paramters object, to a query string */
  var paramURL = qs.stringify(parameters);

  /* Add the query string to the url */
  var apiURL = url+'?'+paramURL;
  console.log(apiURL);
  /* Then we use request to send make the API Request */
  request(apiURL, function(error, response, body){
    console.log(response);
    console.log(error);
    let jBody = JSON.parse(body);
    console.log(jBody);
    initialize(jBody.businesses);
  });
}


function setYelpListings(body) {
  for(let i=0; i < body.businesses.length; i++){
    let yelpLat = body.businesses[i].location.coordinate.latitude;
    let yelpLong = body.businesses[i].location.coordinate.longitude;
      // var latLng = new google.maps.LatLng(yelpLat, yelpLong);
      latLongs.push({lat: yelpLat, lng: yelpLong});
    }
    initialize();
  }
