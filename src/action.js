/* global chrome */
import colorMap from './maps/color-map.js';

export default function setBadge(data, system) {
  const schemeKeyword = colorMap[data.isDayOrNight()][data.condition.code];

  chrome.action.setBadgeBackgroundColor({
    color: colorMap.schemes[schemeKeyword].badge,
  });
  chrome.action.setBadgeText({
    text: `${data[`temp${system.temp}`]}°`,
  });
}
