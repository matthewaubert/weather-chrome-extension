const dom = {
  errorDisplay: document.querySelector('.error'),
  form: {
    form: document.querySelector('form'),
    searchInput: document.querySelector('#search-input'),
  },
  systemToggle: document.querySelector('#system-toggle'),
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
};

export default dom;
