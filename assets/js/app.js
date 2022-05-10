const searchbarElement = document.querySelector(".searchbarElement");
const searchHistoryList = document.querySelector(".list-group");
const searchBtn = document.querySelector("#searchBtn")
const searchbar = document.querySelector("#searchbar")


const APIkey = "b12981328a95eb2a66c796443f1fdb38";


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
    .then(response => response.json()
      .then(data => console.log(data)// how do I get this out?
      ));

  // const cityWeatherArray = data;
  // console.log(cityWeatherArray);
}
//get user search

// turn user search into lat lon
// user search to find data
// display data in feild
//change color of uv
//display 5 day
// save search history in local