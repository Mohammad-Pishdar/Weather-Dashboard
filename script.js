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
    cityAndDate.text(response.name + " " + "(" + moment().format('l') + ")");
    weatherIcon.attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png")
    temperatureSpan.text(((response.main.temp) - 273.15).toFixed(1));
    humiditySpan.text(response.main.humidity);
    windSpeedSpan.text((response.wind.speed * 1.609).toFixed(1));
    let longitude = response.coord.lon;
    let latitude = response.coord.lat;
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/uvi?appid=c5d7b2e683d4e3a0a888a7df1a7043fc&lat=" + latitude + "&lon=" + longitude,
        method: "GET"
    }).then(function (response) {
        crrentUvIndexSpan.text(response.value);
        if (response.value >= 8) {
            crrentUvIndexSpan.addCLass("bg-danger");
        } else if (response.value < 8 && response.value >= 6) {
            crrentUvIndexSpan.addClass("bg-warning");
        } else {
            crrentUvIndexSpan.addClass("bg-success");
        }
    })
});

function fiveDayForecast(city) {
    let queryUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=c5d7b2e683d4e3a0a888a7df1a7043fc";
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#day1date").text(moment().add(1, 'days').format('l'));
        $("#day1Icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[4].weather[0].icon + ".png");
        $("#day1temperature").text(((response.list[4].main.temp) - 273.15).toFixed(1));
        $("#day1Humidity").text(response.list[4].main.humidity);

        $("#day2date").text(moment().add(2, 'days').format('l'));
        $("#day2Icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[12].weather[0].icon + ".png");
        $("#day2temperature").text(((response.list[12].main.temp) - 273.15).toFixed(1));
        $("#day2Humidity").text(response.list[12].main.humidity);

        $("#day3date").text(moment().add(3, 'days').format('l'));
        $("#day3Icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[20].weather[0].icon + ".png");
        $("#day3temperature").text(((response.list[20].main.temp) - 273.15).toFixed(1));
        $("#day3Humidity").text(response.list[20].main.humidity);

        $("#day4date").text(moment().add(4, 'days').format('l'));
        $("#day4Icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[28].weather[0].icon + ".png");
        $("#day4temperature").text(((response.list[28].main.temp) - 273.15).toFixed(1));
        $("#day4Humidity").text(response.list[28].main.humidity);

        $("#day5date").text(moment().add(5, 'days').format('l'));
        $("#day5Icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[36].weather[0].icon + ".png");
        $("#day5temperature").text(((response.list[36].main.temp) - 273.15).toFixed(1));
        $("#day5Humidity").text(response.list[36].main.humidity);

    });
}

fiveDayForecast("sydney");