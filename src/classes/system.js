export default class System {
  constructor({ name, temp, speed }) {
    this.name = name;
    this.temp = temp;
    this.speed = speed;
  }

  static imperial = {
    name: 'imperial',
    temp: 'F',
    speed: 'Mph',
  };

  static metric = {
    name: 'metric',
    temp: 'C',
    speed: 'Kph',
  };

  // return new System instance relevant to given systemName
  // (i.e. metric or imperial)
  static getNewSystem(systemName) {
    return new System(System[systemName]);
  }

  // switch system between imperial and metric
  switchSystem() {
    const newSystem = this.name === 'imperial' ? 'metric' : 'imperial';

    Object.keys(this).forEach((key) => {
      this[key] = System[newSystem][key];
    });
  }
}
