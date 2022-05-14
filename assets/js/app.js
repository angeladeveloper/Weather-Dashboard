const searchbarElement = document.querySelector(".searchbarElement");
const searchHistoryList = document.querySelector(".list-group");
const searchBtn = document.querySelector("#searchBtn")
const searchbar = document.querySelector("#searchbar")
const template = document.querySelector("#template")

const APIkey = "302b9aa0a6fe06dd0591836ad2a5c178";


searchbarElement.addEventListener('click', e => {
  e.preventDefault();
  const userInput = searchbar.value;
  console.log(userInput);
  makeApiCall(userInput);
})


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
  forcast.forEach(day => {
    console.log(day); //Object { dt: 1652990400, ..(ALOT MORE)... pressure: 1012, humidity: 67, … }
    const unixTimestamp = day.dt * 1000
    console.log("UNIX", unixTimestamp); //  UNIX 1652990400 <-- this is correct. 
    const dateObject = new Date(unixTimestamp) // DATE OBJECT Date Mon Jan 19 1970 19:09:50 <-- obv, this is epoch
    console.log("DATE OBJECT", dateObject);
    const humanDateFormat = dateObject.toLocaleString()
    console.log("HUMAN DATE", humanDateFormat); // HUMAN DATE 1/19/1970, 7:09:50 PM

    const fiveTemp = day.dt
    const fiveWind = day.dt
    const fiveHum = day.dt
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
  }
}
// user search to find data
// display data in feild
//change color of uv
//display 5 day
// save search history in local

let numArray = []

for (let i = 0; i < 100000000; i++) {
  numArray.push(i)
}

let test1 = Date.now()
numArray.forEach((el, index) => {
  if (index > 9) return
})
let test1End = Date.now()

let test2 = Date.now()
numArray.every((el, index) => {
  console.log(el)
  if (index > 9) return false
  return true
})
let test2End = Date.now()

let diff1 = test1End - test1
let diff2 = test2End - test2

console.log({ diff1, diff2 })
console.log("test forEach start", test1)
console.log("test forEach end", test1End)
console.log("test every start", test2)
console.log("test every end", test2End)