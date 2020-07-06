# hometask-weatherAPI

* For this exercise you are going to create an weather app using the [OpenWeatherAPI](https://openweathermap.org/current)
* Create and setup an express server with 2 endpoints, one for /nearby and one for /search/:city

* Make the fetch requests to OpenWeatherApi from your express server, using node-fetch. 

* `/nearby` should get the weather near the user. This can be done using HTML Geolocation.
* `/search/:city` should take user input and get current weather for that specific location.

## The layout of the app should be something like this: 
* Title
* Searchbox
* Area where data is displayed nicely.
    
## Criteria:
* On pageload nearby weather should be displayed.
* If you input a city, the weather for that city should be displayed
* Display an icon showing whether or not it's raining, sunny or cloudy etc.

## Feel free to add more features. Here are some ideas!
* Images from the current city
* Wind speed and what direction the wind is coming from
* Feels-like-temperatures
* Being able to check the weather the upcoming days
* Etc.
