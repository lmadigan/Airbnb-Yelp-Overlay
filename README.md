# Airbnb Yelp Overlay

## Background

[Airbnb Yelp Overlay](https://lmadigan.github.io/airbnb-yelp-chrome/) is a chrome extension that enhances the Airbnb user's booking experience by allowing easy viewing of rentals surrounded by top Yelp listings.

## Architecture and Technologies

Sushi Attack! was implemented with the following technologies:

 - `Vanilla JavaScript` for chrome extension layout and formatting
 - `Google Maps API` for creating visible map
 - `Yelp API`  to query for top listings within a 1 mile radius of rental.
 - `OAuth` authentication for access to Yelp API
 - `Browserify` to bundle all necessary requirements

## Features and Implementation
![](/docs/example.png)

This chrome extension parses through webpage content to find geolocation of the Airbnb Listing. It then uses this location to generate a request to `https://api.yelp.com/v2/search` and queries for listings within a 1 mile radius of the rental. The Yelp response is translated into JSON and the top hits are displayed on a map to show distance from the rental.


## Future Features

Future directions for this chrome extension:

- Allow for users to look up Yelp listings by name
- Toggle search by category
- Integrate TripAdvisor API
- Make project open source & gain popularity
