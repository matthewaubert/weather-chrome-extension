/* global chrome */
import { storageAvailable, deserialize } from './chrome-storage.js';
import System from './classes/system.js';
import getWeatherData from './weather-data.js';
import setBadge from './action.js';

// create alarm on extension install
chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason !== 'install') {
    return;
  }

  await chrome.alarms.create('badge-update', {
    delayInMinutes: 20,
    periodInMinutes: 20,
  });
});

chrome.alarms.onAlarm.addListener(async () => {
  if (storageAvailable('local')) {
    // get system from chrome.storage.local
    const system = (await deserialize('wceSystem'))
      ? System.getNewSystem(await deserialize('wceSystem'))
      : System.getNewSystem('imperial');
    // get location from chrome.storage.local
    const location = (await deserialize('wceLocation'))
      ? await deserialize('wceLocation')
      : 'philadelphia';

    const weatherData = await getWeatherData(location); // get weather
    if (!weatherData.error) {
      setBadge(weatherData.current, system); // set badge
    }
  }
});
