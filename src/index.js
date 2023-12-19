import getWeatherData from './weather-data.js';
import renderWeather, { toggleLoadComponent } from './render.js';
import System from './classes/system.js';
import dom from './maps/dom.js';
import {
  storageAvailable,
  serializeSystem,
  deserializeSystem,
  deserializeLocation,
  serializeLocation,
} from './local-storage.js';
import setBadge from './action.js';

// add event listeners
document.addEventListener('DOMContentLoaded', initApp);
dom.form.form.addEventListener('submit', handleSearch);
dom.systemToggle.addEventListener('change', switchSystem);

// variables for system and weather data cache
let currentSystem;
let weatherDataCache;

// init system and weather
function initApp() {
  // init system with value in localStorage or default to imperial
  if (storageAvailable('localStorage') && localStorage.getItem('wceSystem')) {
    // if system is metric, check slider and return metric
    currentSystem = System.getNewSystem(deserializeSystem());
    if (currentSystem.name === 'metric') dom.systemToggle.checked = true;
  }

  // init weather with location from localStorage or default to philadelphia
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
    weatherDataCache = weatherData;
    
    renderWeather(weatherDataCache, currentSystem);
    setBadge(weatherDataCache.current, currentSystem);
    if (storageAvailable('localStorage')) serializeLocation(location); // cache location in localStorage
  }
  toggleLoadComponent(); // hide loading component
}

// prevent form submission and fetch weather
function handleSearch(e) {
  e.preventDefault();
  showWeather(dom.form.searchInput.value);
}

// switch system between imperial and metric
function switchSystem() {
  currentSystem.switchSystem();

  renderWeather(weatherDataCache, currentSystem);
  setBadge(weatherDataCache.current, currentSystem);
  if (storageAvailable('localStorage')) serializeSystem(currentSystem.name); // cache system name in localStorage
}
