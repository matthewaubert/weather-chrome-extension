import getWeatherData from './weather-data.js';

showWeather('Philadelphia');

// get weather data and render to display
async function showWeather(location) {
  const weatherData = await getWeatherData(location);
  if (weatherData !== null) {
    console.log(weatherData);
  }
}
