let celsiusTemperature = null;
let celsiusTemperatureMax = null;
let celsiusTemperatureMin = null;

function formattedDateTime() {
  let currentDate = new Date();
  let newDate = document.querySelector("#date");
  let newDateNumber = currentDate.getDate();
  let newYear = currentDate.getFullYear();
  let indexMonths = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let newMonth = indexMonths[currentDate.getMonth()];
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  newDate.innerHTML = `${hours}:${minutes}, ${newDateNumber}.${newMonth}.${newYear}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function searchCity(city) {
  let apiKey = "ac730adc7d8efa5c2d9bf7cf3f38ab81";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherData);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearchType").value;
  searchCity(city);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ac730adc7d8efa5c2d9bf7cf3f38ab81";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}9&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherData);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showWeatherData(response) {
  document.querySelector("#cityDisplay").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#currentLocationHigh").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}??C`;
  document.querySelector("#currentLocationLow").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}??C`;
  document.querySelector("#currentLocationDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#currentLocationWind").innerHTML = `${Math.round(
    response.data.wind.speed * 2.237
  )}mph winds`;
  document.querySelector("#currentLocationHumidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )}% humidity`;

  let iconElement = document.querySelector("#weatherIconDisplay");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
  celsiusTemperatureMax = response.data.main.temp_max;
  celsiusTemperatureMin = response.data.main.temp_min;

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiKey = "ac730adc7d8efa5c2d9bf7cf3f38ab81";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric&exclude=hourly,minutely`;
  axios.get(apiURL).then(displayForecast);
}

function toFahrenheit(event) {
  event.preventDefault;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    fahrenheitTemperature
  );
  let fahrenheitTemperatureMax = (celsiusTemperatureMax * 9) / 5 + 32;
  document.querySelector("#currentLocationHigh").innerHTML = `${Math.round(
    fahrenheitTemperatureMax
  )}??F`;
  let fahrenheitTemperatureMin = (celsiusTemperatureMin * 9) / 5 + 32;
  document.querySelector("#currentLocationLow").innerHTML = `${Math.round(
    fahrenheitTemperatureMin
  )}??F`;
}

function toCelsius(event) {
  event.preventDefault;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#currentTemp").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#currentLocationHigh").innerHTML = `${Math.round(
    celsiusTemperatureMax
  )}??C`;
  document.querySelector("#currentLocationLow").innerHTML = `${Math.round(
    celsiusTemperatureMin
  )}??C`;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  let days = ["Thurs", "Fri", "Sat", "Sun"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
      <div class="card">
        <div class="card-body">
          <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
            <div class="forecast-temperature"><span class="forecast-temperature-maximum">${Math.round(
              forecastDay.temp.max
            )}??C</span> / <span class="forecast-temperature-minimum">${Math.round(
          forecastDay.temp.min
        )}??C</span></div>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" width=50px">
        </div>
      </div>
    </div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

let button = document.querySelector("#searchCurrentLocation");
button.addEventListener("click", getCurrentLocation);

let cityForm = document.querySelector("#citySearch");
cityForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", toFahrenheit);

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", toCelsius);

formattedDateTime();
searchCity("Cambridge,UK");
