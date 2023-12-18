const dom = {
  root: document.documentElement,
  form: {
    form: document.querySelector('form'),
    searchInput: document.querySelector('#search-input'),
  },
  systemToggle: document.querySelector('#system-toggle'),
  errorDisplay: document.querySelector('.error'),
  location: {
    city: document.querySelector('.city'),
    region: document.querySelector('.region'),
    country: document.querySelector('.country'),
    time: document.querySelector('.time'),
  },
  current: {
    icon: document.querySelector('.condition-icon'),
    text: document.querySelector('.condition-text'),
    temp: document.querySelector('.current-temp'),
    feelsLike: document.querySelector('.current-feelslike'),
  },
  today: {
    highLow: document.querySelector('.high-low').lastElementChild,
    precip: document.querySelector('.precip').lastElementChild,
    humidity: document.querySelector('.humidity').lastElementChild,
    wind: document.querySelector('.wind').lastElementChild,
    cloud: document.querySelector('.cloud').lastElementChild,
    uv: document.querySelector('.uv-index').lastElementChild,
    sunrise: document.querySelector('.sunrise').lastElementChild,
    sunset: document.querySelector('.sunset').lastElementChild,
    moonPhase: document.querySelector('.moon-phase').lastElementChild,
  },
  forecast: [
    {
      title: document.querySelector('.day0').children[0],
      high: document.querySelector('.day0 .high'),
      low: document.querySelector('.day0 .low'),
      icon: document.querySelector('.day0').children[2],
      condition: document.querySelector('.day0').children[3],
    },
    {
      title: document.querySelector('.day1').children[0],
      high: document.querySelector('.day1 .high'),
      low: document.querySelector('.day1 .low'),
      icon: document.querySelector('.day1').children[2],
      condition: document.querySelector('.day1').children[3],
    },
    {
      title: document.querySelector('.day2').children[0],
      high: document.querySelector('.day2 .high'),
      low: document.querySelector('.day2 .low'),
      icon: document.querySelector('.day2').children[2],
      condition: document.querySelector('.day2').children[3],
    },
  ],
  loadComponent: {
    backdrop: document.querySelector('.backdrop'),
    spinner: document.querySelector('.spinner'),
  },
};

export default dom;
