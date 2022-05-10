const searchbarElement = document.querySelector(".searchbarElement");
const searchHistoryList = document.querySelector(".list-group");
const searchBtn = document.querySelector("#searchBtn")
const searchbar = document.querySelector("#searchbar")


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

      takeLatLon(lat, lon);

    }// how do I get this out?
    );

  // const cityWeatherArray = data;
  // console.log(cityWeatherArray);
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
}


// user search to find data
// display data in feild
//change color of uv
//display 5 day
// save search history in local