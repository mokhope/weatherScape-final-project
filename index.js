function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
  }
  
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  }
  
  function displayTemperature(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let cityElement = document.querySelector("#current-city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind-speed");
    let dateElement = document.querySelector("#current-date");
    let iconElement = document.querySelector("#icon");
  
    let temperature = Math.round(response.data.temperature.current);
    let description = response.data.condition.description;
    let humidity = response.data.temperature.humidity;
    let windSpeed = Math.round(response.data.wind.speed);
    let date = new Date(response.data.time * 1000);
    let iconUrl = response.data.condition.icon_url;
    let city = response.data.city;
  
    temperatureElement.innerHTML = temperature;
    descriptionElement.innerHTML = description;
    humidityElement.innerHTML = `${humidity}%`;
    windElement.innerHTML = `${windSpeed} km/h`;
    dateElement.innerHTML = formatDate(date);
    cityElement.innerHTML = city;
    iconElement.innerHTML = `<img src="${iconUrl}" class="current-temperature-icon"/>`;
  
    getForecast(city);
  }
  
  function getForecast(city) {
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }
  
  function displayForecast(response) {
    let forecastHTML = "";
    response.data.daily.forEach(function (day, index) {
      if (index > 0 && index < 6) {
        forecastHTML += `
          <div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
              <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
            </div>
          </div>
        `;
      }
    });
  
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHTML;
  }
  
  function searchCity(city) {
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
  }
  
  function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    searchCity(searchInput.value);
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSearchSubmit);
  
  // Default city
  searchCity("Pretoria");
  