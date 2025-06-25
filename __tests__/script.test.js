const fs = require('fs');
const vm = require('vm');

let appendMock;
let valMock;

function loadScript() {
  const code = fs.readFileSync(require.resolve('../script.js'), 'utf8');
  vm.runInThisContext(code);
}

beforeEach(() => {
  jest.resetModules();

  appendMock = jest.fn();
  valMock = jest.fn(() => 'Paris');

  const searchInputFormMock = { val: valMock, on: jest.fn() };
  const buttonsDivMock = { append: appendMock, on: jest.fn() };

  const generic = () => ({
    text: jest.fn(),
    attr: jest.fn(),
    removeClass: jest.fn(),
    addClass: jest.fn(),
    append: jest.fn(),
    val: jest.fn(),
    on: jest.fn()
  });

  global.$ = jest.fn(selector => {
    if (selector === '.form-control') return searchInputFormMock;
    if (selector === '.added-buttons') return buttonsDivMock;
    if (selector.startsWith('<button')) return {};
    return generic();
  });

  global.localStorage = {
    setItem: jest.fn(),
    getItem: jest.fn(),
    length: 0
  };

  loadScript();

  global.currentWeather = jest.fn();
  global.fiveDayForecast = jest.fn();
});

test('combinedWeatherReport updates UI and storage', () => {
  global.combinedWeatherReport('Paris');

  expect(global.currentWeather).toHaveBeenCalledWith('Paris');
  expect(global.fiveDayForecast).toHaveBeenCalledWith('Paris');
  expect(appendMock).toHaveBeenCalled();
  expect(global.localStorage.setItem).toHaveBeenCalledWith(
    'citiesName',
    JSON.stringify([{ Name: 'Paris' }])
  );
});
