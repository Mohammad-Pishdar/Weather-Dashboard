const cityAndDate = $(".cityAndDate");
const temperatureSpan = $(".temperature-span");
const humiditySpan = $(".humidity-span");
const windSpeedSpan = $(".windSpeedSpan");
const crrentUvIndexSpan = $(".currentUvIndexSpan");
const weatherIcon = $(".weatherIcon");
const startUpQuery = "http://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=c5d7b2e683d4e3a0a888a7df1a7043fc"

$.ajax({
    url: startUpQuery,
    method: "GET"
}).then(function (response) {
    console.log(response);
    cityAndDate.text(response.name + " " + "(" + moment().format('l') + ")");
    weatherIcon.attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon +
        ".png")
    temperatureSpan.text(((response.main.temp) - 273.15).toFixed(1));
    humiditySpan.text(response.main.humidity);
    windSpeedSpan.text((response.wind.speed * 1.609).toFixed(1));
    let longitude = response.coord.lon;
    let latitude = response.coord.lat;
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/uvi?appid=c5d7b2e683d4e3a0a888a7df1a7043fc&lat=" + latitude + "&lon=" + longitude,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        crrentUvIndexSpan.text(response.value);
    })
});