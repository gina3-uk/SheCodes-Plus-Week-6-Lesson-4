function formattedDateTime() {
  let currentDate = new Date();
  let newDate = document.querySelector("#date");
  let newDateNumber = currentDate.getDate();
  let indexDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let newDay = indexDays[currentDate.getDay()];
  let indexMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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

  newDate.innerHTML = `${newDay} ${newDateNumber} ${newMonth}, ${hours}:${minutes}`;
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
  )}°C`;
  document.querySelector("#currentLocationLow").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°C`;
  document.querySelector("#currentLocationDescription").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#currentLocationWind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}mph winds`;
  document.querySelector("#currentLocationHumidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )}% humidity`;
}

let button = document.querySelector("#searchCurrentLocation");
button.addEventListener("click", getCurrentLocation);

let cityForm = document.querySelector("#citySearch");
cityForm.addEventListener("submit", handleSubmit);

formattedDateTime();
searchCity("Cambridge,UK");

//function toCelsuis(event) {
//  event.preventDefault();
//  let changeCelsuis = document.querySelector("#currentTemp");
//  changeCelsuis.innerHTML = "23";
//}
//let celsuis = document.querySelector("#celsuis");
//celsuis.addEventListener("click", toCelsuis);

//function toFahrenheit(event) {
//  event.preventDefault();
//  let changeFahreneheit = document.querySelector("#currentTemp");
//  changeFahreneheit.innerHTML = "<em>74</em>";
//}
//let fahrenheit = document.querySelector("#fahrenheit");
//fahrenheit.addEventListener("click", toFahrenheit);