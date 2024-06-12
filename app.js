// Selecting DOM elements
const container = document.querySelector(".container");
const searchButton = document.querySelector(".search-box button");
const searchInput = document.querySelector(".search-box input");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

// Function to fetch weather data
function fetchWeatherData(city) {
  // API Key for OpenWeatherMap API (obselete key):
  const APIKey = "2f200026ae5c1d68dd0c52ed2e868e31";

  // Fetching weather data from OpenWeatherMap API
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json()) // Parsing response as JSON
    .then((json) => {
      // If city not found, show 404 error message
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      // Hide 404 error message if city found
      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      // Selecting DOM elements for weather information
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      // Setting weather icon based on weather condition
      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Snow":
          image.src = "images/snow.png";
          break;
        case "Clouds":
          image.src = "images/cloud.png";
          break;
        case "Haze":
          image.src = "images/mist.png";
          break;
        default:
          image.src = "";
      }

      // Setting temperature, description, humidity, and wind speed
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      // Displaying weather information
      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
}

// Adding click event listener to search button
searchButton.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city !== "") {
    fetchWeatherData(city);
  }
});

// Adding key press event listener to input field
searchInput.addEventListener("keypress", (event) => {
  // Check if Enter key is pressed (key code 13)
  if (event.keyCode === 13) {
    const city = searchInput.value.trim();
    if (city !== "") {
      fetchWeatherData(city);
    }
  }
});
