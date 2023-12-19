/* global chrome */
import {
  storageAvailable,
  deserializeSystem,
  deserializeLocation,
} from './local-storage.js';
import System from './classes/system.js';
import getWeatherData from './weather-data.js';
import setBadge from './action.js';

// create alarm on extension install
chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason !== 'install') {
    return;
  }

  await chrome.alarms.create('badge-update', {
    delayInMinutes: 1,
    periodInMinutes: 1,
  });
});

chrome.alarms.onAlarm.addListener(async () => {
  console.log(storageAvailable('localStorage'));
  if (storageAvailable('localStorage')) {
    console.log('hello world');
    // get system from localStorage
    const system = localStorage.getItem('wceSystem')
      ? System.getNewSystem(deserializeSystem())
      : System.getNewSystem('imperial');
    // get location from localStorage
    const location = localStorage.getItem('wceLocation')
      ? deserializeLocation()
      : 'philadelphia';

    const weatherData = await getWeatherData(location); // get weather
    if (!weatherData.error) {
      setBadge(weatherData.current, system); // set badge

      console.log('updated!');
    }
  }
});
