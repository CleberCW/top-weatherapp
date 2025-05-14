const apiKey = process.env.WEATHER_API_KEY;

export async function retrieveWeatherData(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Api called");
    return data;
  } catch (e) {
    console.log("Error:", e);
  }
}

import info from "./data.json";

export function weatherParser(info) {
  const weatherObj = {};
  weatherObj.currentTemperature = info.currentConditions.temp;
  weatherObj.description = info.currentConditions.conditions;
  weatherObj.minTemp = info.days[0].tempmin;
  weatherObj.maxTemp = info.days[0].tempmax;
  weatherObj.description = info.description;

  weatherObj.location = info.resolvedAddress;
  weatherObj.icon = info.currentConditions.icon;

  const time = new Date();

  const formattedTime = parseInt(String(time.getTime()).slice(0, 10));

  weatherObj.currentTime = `${time.getHours()}:${time.getMinutes()}`;
  const allHours = info.days.flatMap((day) => day.hours);
  const rainHours = allHours
    .filter((hour) => hour.datetimeEpoch > formattedTime)
    .slice(0, 7);

  weatherObj.currentRainProbability = rainHours.map(
    ({ datetime, precipprob }) => ({
      datetime,
      precipprob,
    })
  );

  const allDays = info.days.flatMap((day) => day);

  const nextDays = allDays
    .filter((day) => day.datetimeEpoch > formattedTime)
    .slice(0, 5);
  weatherObj.nextDaysForecast = nextDays.map(
    ({ conditions, temp, datetime }) => ({
      conditions,
      temp,
      datetime,
    })
  );

  weatherObj.currentInfo = info.currentConditions;
  return weatherObj;
}
