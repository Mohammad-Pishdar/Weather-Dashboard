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
        //Had to come up with this special algorithm to choose the highest temperature of the day if it hapens to be the in the first data index on response.list otherwise the algorithm continues looping until it finds the highest temperature in the day. It's not a perfect solution though as it fails to retrieve the exact midday temperature all the time that should logically be reported as the forecasted temperature of the day and leans instead towards the early afternoon temperatures that are a bit higher. I had to use this logic since the free version of forecast of this API gives weather data every 3 hours so instead of 5 distinct weather data to use for your five days you'll end up with an array of 40 items (5 * 8) and the order will change depending on the time of the day. The other option which is probably much easier to use and more accurate than this was to use their 16 day weather forecast API that included an option to set the number of days you want but that was unfortunately only available to the paid users. 
        for (let i = 0; i < response.list.length; i++) {
            if ((response.list[i].main.temp > response.list[i + 1].main.temp) && (response.list[i].main.temp > response.list[i + 2].main.temp && response.list[i].sys.pod === "d")) {
                index = i;
                break;
            } else {
                continue;
                if ((response.list[i].main.temp > response.list[i - 1].main.temp) && (response.list[i].main.temp > response.list[i + 1].main.temp) && response.list[i].sys.pod === "d") {
                    index = i;
                    break;
                }
            }
        }


        $("#day1date").text(moment().add(1, 'days').format('l'));
        $("#day1Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[index].weather[0].icon + ".png");
        $("#day1temperature").text(response.list[index].main.temp);
        $("#day1Humidity").text(response.list[index].main.humidity);

        $("#day2date").text(moment().add(2, 'days').format('l'));
        $("#day2Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[index + 8].weather[0].icon + ".png");
        $("#day2temperature").text(response.list[index + 8].main.temp);
        $("#day2Humidity").text(response.list[index + 8].main.humidity);

        $("#day3date").text(moment().add(3, 'days').format('l'));
        $("#day3Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[index + 16].weather[0].icon + ".png");
        $("#day3temperature").text(response.list[index + 16].main.temp);
        $("#day3Humidity").text(response.list[index + 16].main.humidity);

        $("#day4date").text(moment().add(4, 'days').format('l'));
        $("#day4Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[index + 24].weather[0].icon + ".png");
        $("#day4temperature").text(response.list[index + 24].main.temp);
        $("#day4Humidity").text(response.list[index + 24].main.humidity);

        $("#day5date").text(moment().add(5, 'days').format('l'));
        $("#day5Icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[index + 32].weather[0].icon + ".png");
        $("#day5temperature").text(response.list[index + 32].main.temp);
        $("#day5Humidity").text(response.list[index + 32].main.humidity);

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

buttonsDiv.on("click", function (event) {
    let cityName = event.target.dataset.value;
    currentWeather(cityName);
    fiveDayForecast(cityName);
})

appStart();