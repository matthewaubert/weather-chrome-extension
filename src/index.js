import getWeatherData from './weather-data.js';
import renderWeather from './render.js';
import dom from './dom.js';

showWeather('Philadelphia');
dom.form.form.addEventListener('submit', handleSearch);

// get weather data and render to display
async function showWeather(location) {
  const weatherData = await getWeatherData(location);
  if (weatherData !== null) {
    renderWeather(weatherData);
    console.log(weatherData);
  }
}

async function handleSearch(e) {
  e.preventDefault();
  showWeather(dom.form.searchInput.value);
}
