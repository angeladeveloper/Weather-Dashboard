const searchbarElement = document.querySelector(".searchbarElement");
const searchHistoryList = document.querySelector(".list-group");
const searchBtn = document.querySelector("#searchBtn")
const searchbar = document.querySelector("#searchbar")
const template = document.querySelector("#template")
const fiveDayContainer = document.querySelector("#five-day-container")

const APIkey = "302b9aa0a6fe06dd0591836ad2a5c178";
let LOCAL_STORAGE_KEY_SEARCH;
let LOCAL_STORAGE_KEY_SEARCH_URL;
let STORED_SEARCH = localStorage.getItem("LOCAL_STORAGE_KEY_SEARCH") || undefined;
const toF = function (c) {
  return (c * 1.8) + 32
}
//search
searchbarElement.addEventListener('click', e => {
  e.preventDefault();
  const userInput = searchbar.value;
  console.log(userInput);
  clearElement(fiveDayContainer);
  makeApiCall(userInput);
})

//display the 5 day forecast
function displayCard(day) {
  const unixTimestamp = day.dt * 1000
  const dateObject = new Date(unixTimestamp);
  const humanDateFormat = dateObject.toLocaleDateString()
  let fiveTemp = Math.floor(day.temp.day) - 273
  const fiveWind = day.wind_speed
  const fiveHum = day.humidity
  console.log("fiveDayTempC:", fiveTemp);
  fiveTemp = Math.floor(toF(fiveTemp));
  console.log("fiveDayTemp:", fiveTemp);

  const fiveDayCard = document.createElement("div");
  fiveDayCard.setAttribute("class", "five-day-card")

  const cardTitle = document.createElement("h4");
  cardTitle.setAttribute("class", "five-day-date");
  cardTitle.textContent = humanDateFormat

  const cardList = document.createElement("ul");
  cardList.setAttribute("class", "five-day-list");

  const cardListTemp = document.createElement("li");
  cardList.setAttribute("class", "five-day-li");
  cardListTemp.textContent = `Temp${fiveTemp} \u00B0F`

  const cardListWind = document.createElement("li");
  cardList.setAttribute("class", "five-day-li");
  cardListWind.textContent = `Wind:${fiveWind}MPH`;

  const cardListHum = document.createElement("li");
  cardList.setAttribute("class", "five-day-li");
  cardListHum.textContent = `Humidity:${fiveHum}%`;
  // append all the things
  cardList.appendChild(cardTitle)
  cardList.appendChild(cardListTemp);
  cardList.appendChild(cardListWind);
  cardList.appendChild(cardListHum);
  fiveDayCard.appendChild(cardList);
  fiveDayContainer.appendChild(fiveDayCard);

}
//clear the results when user searches again
function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}


function makeApiCall(userSearch) {
  const queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${userSearch}&limit=1&appid=${APIkey}`
  console.log(queryURL);

  fetch(queryURL)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(data => {
      console.log(data[0]);
      const lat = +data[0].lat;
      const lon = +data[0].lon;
      const name = data[0].name;
      takeLatLon(lat, lon);
      displayCityName(name);
    }// how do I get this out?
    )
    .catch((error) => {
      console.error("error", error);
    })
}
function displayCityName(cityName) {
  document.querySelector('#cityName').innerText = cityName

}
function takeLatLon(latitude, longitude) {
  console.log(`Lat and lon respect ${latitude} ${longitude}`);
  const lat = +latitude
  const lon = +longitude
  console.log(lon);
  fetchWeather(lat, lon);
}

function fetchWeather(latitude, longitude) {
  const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units{imperial}&appid=${APIkey}`;
  console.log(weatherURL);
  fetch(weatherURL)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(data => {
      const currentCondition = data.current.weather[0].main
      const currenticon = data.current.weather[0].icon
      const currentTemp = Math.floor(data.current.temp - 273.15)
      const currentHum = data.current.humidity
      const currentWind = data.current.wind_speed
      const currentUVI = data.current.uvi
      const dailyArray = data.daily

      displayWeather(currentCondition, currenticon, currentTemp, currentHum, currentUVI, currentWind, dailyArray);// please dont mess up this order. 
      checkUvi(currentUVI);
      displayIcon(currenticon);
      setSearchInLocal(weatherURL);
    }
    )
    .catch((error) => {
      console.error("error", error);
    })
}

function displayWeather(condition, icon, temp, humidity, uvi, wind, five_day) {
  document.querySelector('#current-conditions').innerText = condition;
  document.querySelector('#humidity-condition').innerText = humidity;
  document.querySelector('i').innerText = icon;
  console.log("Icon Code:", icon);
  temp = toF(temp);
  document.querySelector('#temp-condition').innerText = `${temp}\u00B0F`; //nned to convert
  document.querySelector('#humidity-condition').innerText = `Humidity: ${humidity}`;
  document.querySelector('#UV-condition').innerText = `UV Index: ${uvi}`;
  document.querySelector('#wind-condition').innerText = `Wind: ${wind}`;
  const dailyArray = five_day
  displayFiveDay(dailyArray)
}

function displayIcon(icon) {
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
  document.getElementById("currentIcon").setAttribute("src", iconUrl)
}


function displayFiveDay(forcast) {
  forcast.forEach((day, index) => {
    if (index === 0 || index > 5) {
      return
    } else {
      displayCard(day);
    }

  });
}
function checkUvi(uvi) {
  console.log(uvi);

  if (uvi >= 11) {
    console.log(`The UVI is REAL BaD`);
  } else if (uvi >= 8) {
    console.log(`The UVI is BaD`);
  } else if (uvi >= 6) {
    console.log(`The UVI is HIGH`);
  } else if (uvi >= 3) {
    console.log(`The UVI is MEDIUM`);
  } else {
    console.log(`The UVI is LOW`);
    document.getElementById("UV-condition").classList.add("low");
  }
}

function setSearchInLocal(url) {
  LOCAL_STORAGE_KEY_SEARCH_URL = url
  LOCAL_STORAGE_KEY_SEARCH = "Search term"
  localStorage.setItem(LOCAL_STORAGE_KEY_SEARCH, LOCAL_STORAGE_KEY_SEARCH_URL)
}