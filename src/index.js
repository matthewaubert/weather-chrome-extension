import getWeatherData from './weather-data.js';
import renderWeather, {
  toggleLoadComponent,
  renderError,
  clearError,
} from './render.js';
import System from './classes/system.js';
import dom from './maps/dom.js';
import {
  storageAvailable,
  serializeSystem,
  serializeLocation,
  deserialize,
} from './chrome-storage.js';
import setBadge from './action.js';

// add event listeners
document.addEventListener('DOMContentLoaded', initApp);
dom.form.form.addEventListener('submit', handleSearch);
dom.systemToggle.addEventListener('change', switchSystem);

// variables for system and weather data cache
let currentSystem;
let weatherDataCache;

// init system and weather
async function initApp() {
  // init system with value in chrome.storage.local or default to imperial
  if ((await storageAvailable('local')) && (await deserialize('wceSystem'))) {
    // if system is metric, check slider and return metric
    currentSystem = System.getNewSystem(await deserialize('wceSystem'));
    if (currentSystem.name === 'metric') dom.systemToggle.checked = true;
  } else {
    currentSystem = System.getNewSystem('imperial');
    dom.systemToggle.checked = false;
  }

  // init weather with location from chrome.storage.local or default to philadelphia
  if ((await storageAvailable('local')) && (await deserialize('wceLocation'))) {
    showWeather(await deserialize('wceLocation'));
  } else {
    showWeather('philadelphia');
  }
}

// get weather data and render to display
async function showWeather(location) {
  toggleLoadComponent(); // show loading component
  const weatherData = await getWeatherData(location);
  if (!weatherData.error) {
    clearError();
    weatherDataCache = weatherData;

    renderWeather(weatherDataCache, currentSystem);
    setBadge(weatherDataCache.current, currentSystem);
    if (await storageAvailable('local')) serializeLocation(location); // cache location in chrome.storage.local
  } else renderError(weatherData.error);
  toggleLoadComponent(); // hide loading component
}

// prevent form submission and fetch weather
function handleSearch(e) {
  e.preventDefault();
  showWeather(dom.form.searchInput.value);
}

// switch system between imperial and metric
async function switchSystem() {
  currentSystem.switchSystem();

  renderWeather(weatherDataCache, currentSystem);
  setBadge(weatherDataCache.current, currentSystem);
  if (await storageAvailable('local')) serializeSystem(currentSystem.name); // cache system name in chrome.storage.local
}
