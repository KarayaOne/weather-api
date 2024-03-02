const button = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const city = document.getElementById("location");
const temp = document.getElementById("temp");
const weather = document.getElementById("weather");
const humidity = document.getElementById("humidity");
const winds = document.getElementById("winds");
const weatherIcon = document.getElementById("weather-icon");
const weatherAppContainer = document.querySelector(".weather-app");
const labelSearch = document.querySelector(".label-search");
const searchIcon = document.querySelector(".search-icon");

function updateWeatherIcon(weatherCondition) {
  const weatherIconMap = {
    Rain: "rainy",
    Clear: "clear_day",
    Thunderstorm: "thunderstorm",
    Clouds: "cloudy",
    Drizzle: "rainy",
    Snow: "snowy",
    Mist: "mist",
    Smoke: "foggy",
    Haze: "foggy",
    Dust: "dust",
    Fog: "foggy",
    Sand: "sandstorm",
    Squall: "windy",
    Tornado: "tornado",
  };

  const iconText = weatherIconMap[weatherCondition] || "clear_day";

  if (weatherIcon) {
    weatherIcon.textContent = iconText;
  } else {
    console.warn("Weather icon element with ID 'weatherIcon' not found.");
  }
}

const apiKey = "1e86eba581878b91dc5c811e1b6d9065";

const getApiKey = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
  const request = await fetch(url);
  return request;
};

const getData = async () => {
  let request;
  if (cityInput == undefined || cityInput.value == "") {
    request = await getApiKey("Lahore");
  } else {
    request = await getApiKey(cityInput.value);
  }
  const data = await request.json();
  return data;
};
const setData = async () => {
  const data = await getData();
  city.textContent = data.name;
  temp.textContent = Math.floor(data.main.temp) + "°c";
  weather.textContent = data.weather[0].main;
  updateWeatherIcon(data.weather[0].main.toString());
  updateBackgroundColor(data.weather[0].main.toString());
  humidity.textContent = data.main.humidity + "%";
  winds.textContent = data.wind.speed + " Km/h";
};

function updateBackgroundColor(weatherCondition) {
  const backgroundColors = {
    Clear: ["#ff9933", "#e68a00"],
    Thunderstorm: ["#36013f", "#30012d"],
    Drizzle: ["#4285f4", "#3978e4"],
    Clouds: ["#808080", "#737373"],
    Rain: ["darkgray", "#a0a0a0"],
    Snow: ["#d7e8f8", "#c0d9f0"],
    Mist: ["#e0e0e0", "#c8c8c8"],
    Smoke: ["#cccccc", "#b3b300"],
    Haze: ["#cccccc", "#b3b3b3"],
    Dust: ["brown", "#996633"],
    Fog: ["#e0e0e0", "#cccccc"],
    Sand: ["#f2f2f2", "#e6cc00"],
    Squall: ["#b3b3b3", "#a6a6a6"],
    Tornado: ["#f2f2f2", "#e60000"],
  };

  const defaultColor = "#ffffff";
  const color1 = backgroundColors[weatherCondition]?.[0] || defaultColor;
  const color2 = backgroundColors[weatherCondition]?.[1] || defaultColor;

  if (weatherAppContainer) {
    weatherAppContainer.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
    searchIcon.addEventListener("mouseenter", function () {
      this.style.color = `${color1}`;
    });
    labelSearch.style.background = `${color1}`;
  } else {
    console.warn(
      "App container element with class '.app-container' not found."
    );
  }
}
searchIcon.addEventListener("mouseleave", function () {
  this.style.color = "white";
});
cityInput.addEventListener("blur", function () {
  if (this.value.trim() !== "") {
    this.focus();
  }
});
cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    setData();
  }
});

button.addEventListener("click", function () {
  setData();
});
setData();
