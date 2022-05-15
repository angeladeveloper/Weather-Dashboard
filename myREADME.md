# Weather-Dashboard

#### simple weather dashboard with search capabilities

#### I used the OpenWeatherApi to recieve the weather Data

-https://openweathermap.org/

Open weather API is very through, meaning their data comes in pretty large objects (1766 Lines Long!). There is tons of information available, but I wanted to parse down the information so its easier for the average user to read.

## How to Use

Simply Search the city name that you'd like to know the weather forecast for!

Please let me [SKIP](#thank-goodness) this object

#example-object

```js
,
			"pressure": 1020,
			"humidity": 46,
			"dew_point": 275.53,
			"wind_speed": 3.77,
			"wind_deg": 243,
			"wind_gust": 7.1,
			"weather": [
				{
					"id": 500,
					"main": "Rain",
					"description": "light rain",
					"icon": "10d"
				}
			],
			"clouds": 100,
			"pop": 0.54,
			"rain": 1.45,
			"uvi": 7
		},
		{
			"dt": 1652904000,
			"sunrise": 1652876918,
			"sunset": 1652931738,
			"moonrise": 0,
			"moonset": 1652883360,
			"moon_phase": 0.6,
			"temp": {
				"day": 284.94,
				"min": 279.99,
				"max": 286,
				"night": 280.83,
				"eve": 283.52,
				"morn": 282
			},
			"feels_like": {
				"day": 284.19,
				"night": 280.83,
				"eve": 282.81,
				"morn": 280.32
			},
			"pressure": 1018,
			"humidity": 77,
			"dew_point": 280.68,
			"wind_speed": 3.33,
			"wind_deg": 184,
			"wind_gust": 8.51,
			"weather": [
				{
					"id": 500,
					"main": "Rain",
					"description": "light rain",
					"icon": "10d"
				}
			],
			"clouds": 89,
			"pop": 0.98,
			"rain": 5.22,
			"uvi": 7
		},
		{
			"dt": 1652990400,
			"sunrise": 1652963252,
			"sunset": 1653018211,
			"moonrise": 1652945400,
			"moonset": 1652973720,
			"moon_phase": 0.64,
			"temp": {
				"day": 288.63,
				"min": 277.97,
				"max": 288.63,
				"night": 281.29,
				"eve": 282.64,
				"morn": 281.48
			},
			"feels_like": {
				"day": 287.49,
				"night": 279.51,
				"eve": 281.56,
				"morn": 281.48
			},
			"pressure": 1007,
			"humidity": 48,
			"dew_point": 277.14,
			"wind_speed": 2.87,
			"wind_deg": 193,
			"wind_gust": 7.07,
			"weather": [
				{
					"id": 500,
					"main": "Rain",
					"description": "light rain",
					"icon": "10d"
				}
			],
			"clouds": 92,
			"pop": 0.8,
			"rain": 1.6,
			"uvi": 7
		}
	]
}
```

#thank-goodness

## DEMO

![site-working](/weather.gif)

### Challenges

- I am still implamenting local storage to save the users most recent searches. As of now, it isnt live.

- looping throught the Daily 5 day forecast was a challeng. I needed to grab alot of information that was all nested on diffrent levels.

### Take a look at the function that handles displaying the 5 day forecast cards.

```js
//display the 5 day forecast
function displayCard(day) {
  const unixTimestamp = day.dt * 1000;
  const dateObject = new Date(unixTimestamp);
  const humanDateFormat = dateObject.toLocaleDateString();
  let fiveTemp = Math.floor(day.temp.day) - 273.15; //Silly Kelvin
  fiveTemp = Math.floor(toF(fiveTemp));
  // here I am converting to F in another function.
  const fiveWind = day.wind_speed;
  const fiveHum = day.humidity;
  const fiveDayCard = document.createElement("div");
  fiveDayCard.setAttribute("class", "five-day-card");

  const cardTitle = document.createElement("h4");
  cardTitle.setAttribute("class", "five-day-date");
  cardTitle.textContent = humanDateFormat;

  const cardList = document.createElement("ul");
  cardList.setAttribute("class", "five-day-list");

  const cardListTemp = document.createElement("li");
  cardList.setAttribute("class", "five-day-li");
  cardListTemp.textContent = `Temp${fiveTemp} \u00B0F`;

  const cardListWind = document.createElement("li");
  cardList.setAttribute("class", "five-day-li");
  cardListWind.textContent = `Wind:${fiveWind}MPH`;

  const cardListHum = document.createElement("li");
  cardList.setAttribute("class", "five-day-li");
  cardListHum.textContent = `Humidity:${fiveHum}%`;
  // append all the things
  cardList.appendChild(cardTitle);
  cardList.appendChild(cardListTemp);
  cardList.appendChild(cardListWind);
  cardList.appendChild(cardListHum);
  fiveDayCard.appendChild(cardList);
  fiveDayContainer.appendChild(fiveDayCard);
}
```
