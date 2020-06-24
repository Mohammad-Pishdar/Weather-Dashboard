const cityAndDate = $(".cityAndDate");
const temperatureSpan = $(".temperature-span");
const humiditySpan = $(".humidity-span");
const windSpeedSpan = $(".windSpeedSpan");
const crrentUvIndexSpan = $(".currentUvIndexSpan");
const weatherIcon = $(".weatherIcon");
const searchInputForm = $(".form-control");
const submitButton = $("#submit-button");
const buttonsDiv = $(".added-buttons");
let cities = [];

function currentWeather(city) {
    let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c5d7b2e683d4e3a0a888a7df1a7043fc&units=metric"
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        cityAndDate.text(response.name + " " + "(" + moment().format('l') + ")");
        weatherIcon.attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png")
        temperatureSpan.text((response.main.temp).toFixed(1));
        humiditySpan.text(response.main.humidity);
        windSpeedSpan.text(response.wind.speed);
        let longitude = response.coord.lon;
        let latitude = response.coord.lat;
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?appid=c5d7b2e683d4e3a0a888a7df1a7043fc&lat=" + latitude + "&lon=" + longitude,
            method: "GET"
        }).then(function (response) {
            crrentUvIndexSpan.text(response.value);
            if (response.value >= 8) {
                crrentUvIndexSpan.removeClass("bg-success");
                crrentUvIndexSpan.removeClass("bg-warning");
                crrentUvIndexSpan.addClass("bg-danger");
            }
            if (response.value < 8 && response.value >= 6) {
                crrentUvIndexSpan.removeClass("bg-success");
                crrentUvIndexSpan.removeClass("bg-danger");
                crrentUvIndexSpan.addClass("bg-warning");
            }
            if (response.value < 6) {
                crrentUvIndexSpan.removeClass("bg-danger");
                crrentUvIndexSpan.removeClass("bg-warning");
                crrentUvIndexSpan.addClass("bg-success");
            }
        })
    });
}

function fiveDayForecast(city) {
    let queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=c5d7b2e683d4e3a0a888a7df1a7043fc&units=metric";
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        let index;
        for (let i = 0; i < response.list.length; i++) {
            if (response.list[i].sys.pod === "d") {
                if (response.list[i + 1].sys.pod === "d") {
                    index = i;
                    break;
                }
            }
        }
        $("#day1date").text(moment().add(1, 'days').format('l'));
        $("#day1Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[index + 1].weather[0].icon + ".png");
        $("#day1temperature").text(response.list[index + 1].main.temp);
        $("#day1Humidity").text(response.list[index + 1].main.humidity);

        $("#day2date").text(moment().add(2, 'days').format('l'));
        $("#day2Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[index + 9].weather[0].icon + ".png");
        $("#day2temperature").text(response.list[index + 9].main.temp);
        $("#day2Humidity").text(response.list[index + 9].main.humidity);

        $("#day3date").text(moment().add(3, 'days').format('l'));
        $("#day3Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[index + 17].weather[0].icon + ".png");
        $("#day3temperature").text(response.list[index + 17].main.temp);
        $("#day3Humidity").text(response.list[index + 17].main.humidity);

        $("#day4date").text(moment().add(4, 'days').format('l'));
        $("#day4Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[index + 25].weather[0].icon + ".png");
        $("#day4temperature").text(response.list[index + 25].main.temp);
        $("#day4Humidity").text(response.list[index + 25].main.humidity);

        $("#day5date").text(moment().add(5, 'days').format('l'));
        $("#day5Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[index + 33].weather[0].icon + ".png");
        $("#day5temperature").text(response.list[index + 33].main.temp);
        $("#day5Humidity").text(response.list[index + 33].main.humidity);

    });
}

function combinedWeatherReport(city) {
    currentWeather(city);
    fiveDayForecast(city);
    buttonsDiv.append($("<button type='button' class='btn btn-primary btn-lg m-1 btn-block' data-value=" + searchInputForm.val() + ">" + searchInputForm.val() + "</button>"));
    cities.push({
        Name: searchInputForm.val()
    });
    localStorage.setItem("citiesName", JSON.stringify(cities));
}

function appStart() {

    if (localStorage.length !== 0) {
        cities = JSON.parse(localStorage.getItem("citiesName"));

        for (let i = 0; i < cities.length; i++) {

            buttonsDiv.append($("<button type='button' class='btn btn-primary btn-lg m-1 btn-block' data-value=" + cities[i].Name + ">" + cities[i].Name + "</button>"));

        }
        currentWeather(cities[cities.length - 1].Name);
        fiveDayForecast(cities[cities.length - 1].Name);
    }
}


searchInputForm.on("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submitButton.click();
    }
})

submitButton.on("click", function () {
    let cityName = searchInputForm.val();
    combinedWeatherReport(cityName);
})

buttonsDiv.on("click", function () {
    let cityName = event.target.dataset.value;
    currentWeather(cityName);
    fiveDayForecast(cityName);
})

appStart();