import getWeatherData from './weather-data.js';
import renderWeather, { toggleLoadComponent } from './render.js';
import dom from './dom.js';
import {
  storageAvailable,
  deserializeLocation,
  serializeLocation,
} from './local-storage.js';

// add event listeners
document.addEventListener('DOMContentLoaded', initApp);
dom.form.form.addEventListener('submit', handleSearch);

// init app with weather from cached location or philadelphia
function initApp() {
  if (storageAvailable('localStorage') && localStorage.getItem('wceLocation')) {
    showWeather(deserializeLocation());
  } else {
    showWeather('philadelphia');
  }
}

// get weather data and render to display
async function showWeather(location) {
  toggleLoadComponent(); // show loading component
  const weatherData = await getWeatherData(location);
  if (weatherData !== null) {
    renderWeather(weatherData);
    if (storageAvailable('localStorage')) serializeLocation(location); // cache location in localStorage
  }
  toggleLoadComponent(); // hide loading component
}

// prevent form submission and fetch weather
function handleSearch(e) {
  e.preventDefault();
  showWeather(dom.form.searchInput.value);
}
