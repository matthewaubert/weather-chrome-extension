import { format } from 'date-fns';
import wiMap from './maps/wi-map.js';
import colorMap from './maps/color-map.js';
import dom from './maps/dom.js';

// render fetch error message to error display element
function renderError(err) {
  dom.errorDisplay.innerText = err;
}

// clear error message from error display element
function clearError() {
  dom.errorDisplay.innerText = '';
}

// run all render funcs to display weather data
export default function renderWeather(data, system) {
  renderLocation(data.current);
  renderCurrentWeatherPrimary(data.current, system);
  renderCurrentWeatherSecondary(data.current, system);
  renderForecast(data.forecast, system);
  renderColorScheme(data.current);
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
function renderCurrentWeatherPrimary(data, system) {
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
function renderCurrentWeatherSecondary(data, system) {
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
function renderForecast(data, system) {
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

// render correct color scheme based on weather code
function renderColorScheme(data) {
  const colorScheme =
    colorMap.schemes[colorMap[data.isDayOrNight()][data.condition.code]];

  dom.root.style.setProperty('--bg-gradient', colorScheme.bg);
  dom.root.style.setProperty('--search-bar', colorScheme.searchBar);
  dom.root.style.setProperty('--text-light', colorScheme.textLight);
}

// toggle backdrop and spinner
function toggleLoadComponent() {
  Object.keys(dom.loadComponent).forEach((el) => {
    dom.loadComponent[el].classList.toggle('visible');
  });
}

export { renderError, clearError, toggleLoadComponent };
