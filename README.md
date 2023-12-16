# Weather Chrome Extension

This project was built as my final project for <a href="https://cs50.harvard.edu/x/2023/project/">Harvard's CS50 course</a> in order to learn about creating Chrome extensions and build an extension useful to me.

## Understanding the Problem

Create a weather Chrome extension. It should have pared down functionality compared to a full weather app, but the user should at least be able to search for a specific location, view the current weather, and toggle the data to display in Fahrenheit or Celsius.

The look of the extension icon should update at some interval, showing the current temperature in the user's chosen system (Fahrenheit or Celsius) and an icon related to the current weather code provided by the weather API.

When a user clicks on the extension icon, a small popup window should appear showing more information about the current weather (and possibly a 3-day forecast or hour-by hour forecast).

The user's location and measurement system preferences should be saved in the browser.

## Plan

1. Create a `manifest.json` file to describe the extension's capabilities and configuration
   - Reference: https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world

1. <a href="https://gist.github.com/matthewaubert/0d52f8d091566bf553491cc88e7e3ccb">Project startup</a>

1. Write functions that hit the chosen weather API

1. Write functions that _process_ the JSON data I will receive from the API and return an object with only the data I require for the app
   - current data:
     - chanceOfRain
     - cloud
     - condition
     - feelsLikeC
     - feelsLikeF
     - humidity
     - isDay
     - lastUpdated
     - location
     - moonPhase,
     - sunrise,
     - sunset,
     - tempC
     - tempF
     - uv
     - windDegree
     - windKph
     - windMph
   - daily forecast data:
     - condition
     - date
     - maxTempC
     - maxTempF
     - minTempC
     - minTempF

1. Set up a form that enables the user to input their location. The extension should then fetch the relevant weather info.

1. Display the information on a popup that appears when the extension icon is clicked

1. Add styling

1. enable the extension to save the user's location and measurement system preferences to the browser

1. Enable the extension to regularly update at a certain interval (perhaps every 15 minutes?)

1. Enable the extension icon to show the current temperature and icon relevant to current weather. It should update whenever the the extension gets new data from the API.

1. Add a 'loading' component that displays from the time the form is submitted until the info comes back from the API. (Use DevTools to test for low-end devices.)

### Credits

Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a>

Icons by <a href="https://erikflowers.github.io/weather-icons/" title="Weather Icons">Erik Flowers</a>