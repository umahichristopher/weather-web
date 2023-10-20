const api = {
  key: "5284d4bad0ee6c8f18c39352864efaee",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector(".search-box");

searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
   getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      if (!weather.ok) {
        throw new Error("City not found");
      }
      return weather.json();
    })
    .then(displayResults)
    .catch(handleError); // Handle errors
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;
}

function dateBuilder(d) {
  let months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  let days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function handleError(error) {
  console.error(error); // Log the error for debugging

  // to show an error message
  let city = document.querySelector(".location .city");
  city.innerText = "City not found😫";

  let date = document.querySelector(".location .date");
  date.innerText = "";

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = "";

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = "";

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = "";
}
