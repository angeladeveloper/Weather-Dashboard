const searchbarElement = document.querySelector(".searchbarElement");
const searchHistoryList = document.querySelector(".list-group");
const searchBtn = document.querySelector("#searchBtn")
const searchbar = document.querySelector("#searchbar")
const template = document.querySelector("#template")
const fiveDayContainer = document.querySelector("#five-day-container")

const APIkey = "302b9aa0a6fe06dd0591836ad2a5c178";


searchbarElement.addEventListener('click', e => {
  e.preventDefault();
  const userInput = searchbar.value;
  console.log(userInput);
  makeApiCall(userInput);
})


function displayCard(day) {
  const unixTimestamp = day.dt * 1000
  const dateObject = new Date(unixTimestamp);
  const humanDateFormat = dateObject.toLocaleString()
  const fiveTemp = day.temp.day - 273
  const fiveWind = day.wind_speed
  const fiveHum = day.humidity

  const fiveDayCard = document.createElement("div");
  fiveDayCard.setAttribute("class", "five-day-card")
  const cardTitle = document.createElement("h4");
  cardTitle.setAttribute("class", "five-day-date");
  const cardList = document.createElement("ul");
  cardList.setAttribute("class", "five-day-list");
  const cardListItem = document.createElement("li");
  cardListItem.textContent = fiveTemp;

  cardList.appendChild(cardListItem);
  fiveDayCard.appendChild(cardList);
  fiveDayContainer.appendChild(fiveDayCard);

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
      console.log(data);
      const currentCondition = data.current.weather[0].main
      const currenticon = data.current.weather[0].icon
      const currentTemp = Math.floor(data.current.temp - 273.15)
      const currentHum = data.current.humidity
      const currentWind = data.current.wind_speed
      const currentUVI = data.current.uvi
      const dailyArray = data.daily

      console.log(currentCondition, currentHum, currentTemp, currentUVI, currentWind, currenticon, dailyArray);
      displayWeather(currentCondition, currenticon, currentTemp, currentHum, currentUVI, currentWind, dailyArray);// please dont mess up this order. 
      checkUvi(currentUVI);

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
  document.querySelector('#temp-condition').innerText = temp; //nned to convert
  document.querySelector('#humidity-condition').innerText = humidity;
  document.querySelector('#UV-condition').innerText = uvi;
  document.querySelector('#wind-condition').innerText = wind;
  const dailyArray = five_day
  displayFiveDay(dailyArray)
}

function displayFiveDay(forcast) {
  forcast.forEach((day, index) => {

    displayCard(day);
    // if (index === 0 || index > 5) return
    // console.log(day);
    // const unixTimestamp = day.dt * 1000
    // console.log("UNIX", unixTimestamp);
    // const dateObject = new Date(unixTimestamp);
    // console.log("DATE OBJECT", dateObject);
    // const humanDateFormat = dateObject.toLocaleString()
    // console.log("HUMAN DATE", humanDateFormat);
    // //temp
    // const fiveTemp = day.temp.day - 273
    // console.log("Temp", fiveTemp);
    // //wind
    // const fiveWind = day.wind_speed
    // console.log("wind", fiveWind);
    // //humidity
    // const fiveHum = day.humidity
    // console.log("HUM", fiveHum);



    // const dayElement = document.importNode(template.content, true);
    // const fiveDayDate = document.getElementsByClassName("five-day-date")
    // fiveDayDate.innerText = humanDateFormat;
    // const fiveDayTemp = document.getElementsByClassName("five-day-temp")
    // fiveDayTemp.innerText = fiveTemp;
    // const fiveDayWind = document.getElementsByClassName("five-day-wind");
    // fiveDayWind.innerText = fiveWind;
    // const fiveDayHum = document.getElementsByClassName("five-day-hum")
    // fiveDayHum.innerText = fiveHum;
    // fiveDayContainer.appendChild(dayElement);
  });
}
// function displayFiveDay({ dt, humidity, wind_speed }) {
//   console.log(dt, humidity, wind_speed);
// }
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
  }
}


//change color of uv
//display 5 day
// save search history in local

