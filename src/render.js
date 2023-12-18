import { format } from 'date-fns';
import wiMap from './maps/wi-map.js';
import dom from './dom.js';
import {
  storageAvailable,
  serializeSystem,
  deserializeSystem,
} from './local-storage.js';

// add event listeners
dom.systemToggle.addEventListener('change', switchSystem);

// variable to hold weather data cache
let weatherDataCache;

// measurement systems
const imperial = {
  name: 'imperial',
  temp: 'F',
  speed: 'Mph',
};
const metric = {
  name: 'metric',
  temp: 'C',
  speed: 'Kph',
};
let system = initSystem();

// init system to value in localStorage or default to imperial
function initSystem() {
  if (storageAvailable('localStorage') && localStorage.getItem('wceSystem')) {
    // if system is metric, check slider and return metric
    if (deserializeSystem() === 'metric') {
      dom.systemToggle.checked = true;
      return metric;
    }
  }

  return imperial; // default to imperial
}

// switch system between imperial and metric
function switchSystem() {
  system = system.name === 'imperial' ? metric : imperial;
  if (storageAvailable('localStorage')) serializeSystem(system.name); // cache system
  renderWeather(weatherDataCache);
}

// run all render funcs to display weather data
export default function renderWeather(data) {
  weatherDataCache = data; // cache weather data for later use
  renderLocation(data.current);
  renderCurrentWeatherPrimary(data.current);
  renderCurrentWeatherSecondary(data.current);
  renderForecast(data.forecast);
}

// render location display with weather data
function renderLocation(data) {
  dom.location.city.innerText = data.location.city;
  dom.location.region.innerText = data.location.region
    ? `${data.location.region},`
    : '';
  dom.location.country.innerText = data.location.country;
  dom.location.time.innerText = format(data.time, 'PPPPp');
}

// render primary current weather info
function renderCurrentWeatherPrimary(data) {
  dom.current.icon.innerText = data.isDay
    ? wiMap.day[data.condition.code]
    : wiMap.night[data.condition.code]; // render icon
  dom.current.text.innerText = data.condition.text; // render condition text
  dom.current.temp.innerText = `${data[`temp${system.temp}`]}°${system.temp}`; // render current temp
  dom.current.feelsLike.innerText = `Feels like ${
    data[`feelsLike${system.temp}`]
  }°${system.temp}`; // render current feelslike
}

// render secondary current weather info
function renderCurrentWeatherSecondary(data) {
  dom.today.highLow.innerText = `${data[`maxTemp${system.temp}`]}° / ${
    data[`minTemp${system.temp}`]
  }°`;
  dom.today.precip.innerText = `${data.chanceOfRain}%`;
  dom.today.humidity.innerText = `${data.humidity}%`;
  dom.today.wind.innerText = `${
    data[`wind${system.speed}`]
  } ${system.speed.toLowerCase()}`;
  dom.today.cloud.innerText = `${data.cloud}%`;
  dom.today.uv.innerText = `${data.uv} of 11`;
  dom.today.sunrise.innerText = data.sunrise;
  dom.today.sunset.innerText = data.sunset;
  dom.today.moonPhase.innerText = wiMap.moonPhase[data.moonPhase];
}

// render forecast weather info
function renderForecast(data) {
  // iterate over each day in forecast
  dom.forecast.forEach((day, i) => {
    // render title
    if (day.title.innerText !== 'Today')
      day.title.innerText = format(data[i].date, 'cccc');
    day.high.innerText = `${data[i][`maxTemp${system.temp}`]}°`; // render high
    day.low.innerText = `/ ${data[i][`minTemp${system.temp}`]}°`; // render low
    day.icon.innerText = wiMap.day[data[i].condition.code]; // render icon
    day.condition.innerText = data[i].condition.text; // render condition
  });
}
