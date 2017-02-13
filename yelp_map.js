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
let latLongs = [];

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    lat = response.lat;
    lng = response.lng;
    myLatlng = new google.maps.LatLng(lat, lng);
    geocodeLatLng();
  });
});



// // var Yelp = require('yelp');
function initialize() {

  var mapOptions = {
    zoom: 16,
    center: myLatlng
  };
  yelpMap = new google.maps.Map(document.getElementById("map"), mapOptions);


  // var marker = new google.maps.Marker({
  //     position: myLatlng,
  //     map: yelpMap,
  //     title:"Here's the stuff!"
  // });
  console.log(latLongs);

  for(let i=0; i < latLongs.length; i++){
    var marker1 = new google.maps.Marker({
         position: latLongs[i],
         map: yelpMap
       });
  }

  let marker = new google.maps.Marker({
       position: {lat: 50, lng: 10},
       map: yelpMap
     });

     markers.push(marker);

}

function geocodeLatLng() {
    var geocoder = new google.maps.Geocoder;
      console.log("geocoding!!!");
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
//
// //
var tokens = {
  YELP_CONSUMER_KEY: 'gROY6FtEZekeyCt-XVlNyQ',
  YELP_CONSUMER_SECRET: '3_sHldcV2QelwHxXT7AuZETZV94',
  YELP_TOKEN: 'Li50kGGnR12TaFW_OAumpKyTzV1RC8Bx',
  YELP_TOKEN_SECRET: 'vER3Kb4R1haN9kRfViLHOIeJzO8',
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
  // let stringLat = latitude.toString();
  // let stringLong = longitude.toString();

  var default_parameters = {
    location: location,
    sort: '2'
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

  /* Then we use request to send make the API Request */
  request(apiURL, function(error, response, body){
    console.log(response);
    console.log(error);
    let jBody = JSON.parse(body);
    console.log(jBody);
    console.log(jBody.businesses[0]);
    setYelpListings(jBody);
  });
}


function setYelpListings(body) {
  for(let i=0; i < body.businesses.length; i++){
    let yelpLat = body.businesses[i].location.coordinate.latitude;
    let yelpLong = body.businesses[i].location.coordinate.longitude;
      var latLng = new google.maps.LatLng(yelpLat, yelpLong);
      latLongs.push(latLng);
    }
  initialize();
  }


// function addMarkers(latitude, long) {
//
//   console.log(latLng);
//   var marker = new google.maps.Marker({
//      position: latLng,
//      yelpMap
//    });
//   google.maps.event.addListener(marker, 'click', function() {
//   });
//   console.log(yelpMap);
//   markers.push(marker);
//   console.log(markers);
//   }
