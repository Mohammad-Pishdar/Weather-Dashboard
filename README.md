# Weather Dashboard 

## Description 
Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Here we build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS. We use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. We also use `localStorage` to store any persistent data.

## Table of Contents 

* [Installation](#installation)
* [Usage](#usage)
* [Testing](#testing)
* [Credits](#credits)
* [License](#license)


## Installation

This project is an internet-based app that runs inside the browser so you don't need to install anything. All you need is an internet browser to run the app. Visit the app by clicking here: https://mohammad-pishdar.github.io/Weather-Dashboard/


## Usage 

The app has a search box at the top left corner of the page. You can search in there for the city of your choice and will be presented with current and future weather conditions for that city. The searched city will then be added to the search history below the search box in the form of a button. When you view the current weather conditions for the city, you will be presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index. UV index is also color-coded that indicates whether the conditions are favorable, moderate, or severe (green, orange and red colors, respectively). You will also be presented with a visual 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity. You can at any time click on a city in the search history and again be presented with current and future conditions for that city. The search history does not go away if you refresh the page. After each refresh or if you simply close and open the app again, you will see the data and forecast for the last city in your search history.   

![animated gif to show how weather dashboard works](https://github.com/Mohammad-Pishdar/Weather-Dashboard/blob/master/record.gif)

## Testing

Run `npm install` to install the required dependencies, then execute `npm test` to run the Jest test suite.

## Credits

I would like to thank my amazing instructors Toby Rahilly and Carl Kassebaum for their ongoing support.

## License

You can see the license [here](https://github.com/Mohammad-Pishdar/Weather-Dashboard/blob/master/LICENSE).






