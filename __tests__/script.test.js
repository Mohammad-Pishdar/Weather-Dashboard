const fs = require('fs');
const path = require('path');
const $ = require('jquery');

// Expose jQuery globally
global.$ = $;

document.body.innerHTML = `
  <input class="form-control" />
  <div class="added-buttons"></div>
`;

// Load the application script in the current context
const scriptPath = path.resolve(__dirname, '../script.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');
// eslint-disable-next-line no-eval
eval(scriptContent);

describe('combinedWeatherReport', () => {
  beforeEach(() => {
    localStorage.clear();
    $('.added-buttons').empty();
    $('.form-control').val('');
    global.currentWeather = jest.fn();
    global.fiveDayForecast = jest.fn();
  });

  test('updates weather and storage', () => {
    $('.form-control').val('Paris');
    combinedWeatherReport('Paris');

    expect(global.currentWeather).toHaveBeenCalledWith('Paris');
    expect(global.fiveDayForecast).toHaveBeenCalledWith('Paris');
    const lastButton = $('.added-buttons button').last();
    expect(lastButton.data('value')).toBe('Paris');
    const cities = JSON.parse(localStorage.getItem('citiesName'));
    expect(cities[cities.length - 1].Name).toBe('Paris');
  });
});