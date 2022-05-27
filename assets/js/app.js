const searchbarElement = document.querySelector(".searchbarElement");
const searchHistoryList = document.querySelector(".search-history");
const searchBtn = document.querySelector("#searchBtn")
const searchbar = document.querySelector("#searchbar")
const template = document.querySelector("#template")
const fiveDayContainer = document.querySelector("#five-day-container")


var APIkey = "b12981328a95eb2a66c796443f1fdb38";
const citiesArray = JSON.parse(localStorage.getItem("city")) || [];


const toF = function (c) {
  return (c * 1.8) + 32
}
//search
searchBtn.addEventListener('click', e => {
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
  fiveTemp = Math.floor(toF(fiveTemp));
  const fiveIcon = day.weather[0].icon

  const fiveDayIcon = document.createElement("img");
  fiveDayIcon.setAttribute("class", "five-day-icon")
  const iconUrl = `https://openweathermap.org/img/wn/${fiveIcon}@2x.png`
  fiveDayIcon.setAttribute("src", iconUrl)

  const fiveDayCard = document.createElement("div");
  fiveDayCard.setAttribute("class", "five-day-card")

  const cardTitle = document.createElement("h4");
  cardTitle.setAttribute("class", "five-day-date");
  cardTitle.textContent = humanDateFormat

  const cardList = document.createElement("ul");
  cardList.setAttribute("class", "five-day-list");

  const cardListTemp = document.createElement("li");
  cardList.setAttribute("class", "five-day-li");
  cardListTemp.textContent = `Temp: ${fiveTemp} \u00B0F`

  const cardListWind = document.createElement("li");
  cardList.setAttribute("class", "five-day-li");
  cardListWind.textContent = `Wind: ${fiveWind}MPH`;

  const cardListHum = document.createElement("li");
  cardList.setAttribute("class", "five-day-li");
  cardListHum.textContent = `Humidity: ${fiveHum}%`;
  // append all the things
  fiveDayCard.appendChild(cardTitle)
  cardTitle.appendChild(fiveDayIcon)
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

//take LAT AND LON AND CONVERT
function makeApiCall(userSearch) {
  const queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${userSearch}&limit=1&appid=${APIkey}`
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
      let storedCities = JSON.parse(localStorage.getItem("city"));
      displayCityList(storedCities);
    }// how do I get this out?
    )
    .catch((error) => {
      console.error("error", error);
    })
}

function displayCityName(cityName) {
  document.querySelector('#cityName').innerText = cityName
  setSearchInLocal(cityName);
}

function takeLatLon(latitude, longitude) {
  const lat = +latitude
  const lon = +longitude
  fetchWeather(lat, lon);
}

function fetchWeather(latitude, longitude) {
  const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;
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
      displayIcon(currenticon);
      // checkUvi(currentUVI);
    }
    )
    .catch((error) => {
      console.error("error", error);
    })
}

function displayWeather(condition, icon, temp, humidity, uvi, wind, five_day) {
  document.querySelector('#current-conditions').innerText = condition;
  document.querySelector('#humidity-condition').innerText = humidity;
  console.log("Icon Code:", icon);
  temp = toF(temp);
  document.querySelector('#temp-condition').innerText = `${temp}\u00B0F`; //nned to convert
  document.querySelector('#humidity-condition').innerText = `Humidity: ${humidity}`;
  document.querySelector('#UV-condition').innerText = `UV Index: ${uvi}`;
  document.querySelector('#wind-condition').innerText = `Wind: ${wind}`;
  const dailyArray = five_day
  displayFiveDay(dailyArray)
  checkUvi(uvi);
}

function displayIcon(icon) {
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
  document.getElementById("currentIcon").setAttribute("src", iconUrl)
}


function displayFiveDay(forcast) {
  fiveDayContainer.innerHTML = ""
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
    document.getElementById("UV-condition").classList.add("realBad");
  } else if (uvi >= 8) {
    console.log(`The UVI is BaD`);
    document.getElementById("UV-condition").classList.add("bad");
  } else if (uvi >= 6) {
    console.log(`The UVI is HIGH`);
    document.getElementById("UV-condition").classList.add("high");
  } else if (uvi >= 3) {
    console.log(`The UVI is MEDIUM`);
    document.getElementById("UV-condition").classList.add("medium");
  } else {
    document.getElementById("UV-condition").classList.add("low");
  }
}

function setSearchInLocal(url) {
  citiesArray.push(url)
  localStorage.setItem("city", JSON.stringify(citiesArray));
}

function displayCityList(cities) {
  searchHistoryList.innerHTML = ""
  cities.forEach(city => {
    const searchHistroyBtn = document.createElement("button");
    searchHistroyBtn.setAttribute("class", "search-history-btn");
    searchHistroyBtn.setAttribute("onClick", `makeApiCall("${city}")`);
    searchHistroyBtn.innerText = city
    searchHistoryList.appendChild(searchHistroyBtn)
  })
}