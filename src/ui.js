import Chart from "chart.js/auto";

function rainGraph(data) {
  const grapharea = document.querySelector("#rain-graph canvas");

  const chartInstance = Chart.getChart(grapharea);
  if (chartInstance) {
    chartInstance.destroy();
  }

  new Chart(grapharea, {
    type: "line",
    data: {
      labels: data.map((row) => row.datetime),
      datasets: [
        {
          label: "Rain probability",
          data: data.map((row) => row.precipprob),
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "category",
          offset: false, // ensures label aligns with point
        },
        y: {
          min: 0,
          max: 100,
        },
      },
      plugins: {
        tooltip: {
          enabled: true,
          mode: "nearest",
          intersect: false,
          axis: "x",
          callbacks: {
            label: function (context) {
              const value = context.dataset.data[context.dataIndex]; // Y value
              return `Rain Probability: ${value}%`;
            },
          },
        },
      },
      elements: {
        point: {
          radius: 4,
          hoverRadius: 8,
          hitRadius: 10,
        },
      },
    },
  });
}

export function renderData(obj) {
  const currTemp = document.querySelector("#currTemp");
  currTemp.textContent = obj.currentTemperature;

  const minTemp = document.querySelector("#minTemp");
  minTemp.textContent = obj.minTemp;

  const maxTemp = document.querySelector("#maxTemp");
  maxTemp.textContent = obj.maxTemp;

  const weatherDescription = document.querySelector("#weatherDescription");
  weatherDescription.textContent = obj["description"];

  const location = document.querySelector("#location");
  location.textContent = obj.location;

  const currentTime = document.querySelector("#currentTime");
  currentTime.textContent = obj.currentTime.slice(0, 5);

  const weatherIcon = document.querySelector(".weather-main-icon img");

  const weatherIcons = {
    cloudy: require("./amcharts_weather_icons_1.0.0/animated/cloudy.svg"),
    "partly-cloudy-day": require("./amcharts_weather_icons_1.0.0/animated/cloudy-day-1.svg"),
    "partly-cloudy-night": require("./amcharts_weather_icons_1.0.0/animated/cloudy-night-1.svg"),
    "clear-day": require("./amcharts_weather_icons_1.0.0/animated/day.svg"),
    "clear-night": require("./amcharts_weather_icons_1.0.0/animated/night.svg"),
    snow: require("./amcharts_weather_icons_1.0.0/animated/snowy-1.svg"),
    rain: require("./amcharts_weather_icons_1.0.0/animated/rainy-6.svg"),
  };

  weatherIcon.src = weatherIcons[obj.icon];

  const time = new Date();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[time.getDay()];
  const day = time.getDate().toString().padStart(2, "0");
  const month = (time.getMonth() + 1).toString().padStart(2, "0");

  const currentDate = document.querySelector("#currentDate");
  currentDate.textContent = `${day}/${month} - ${dayName}`;

  const nextDays = document.querySelectorAll(".bottom-left-day-forecast");

  for (let i = 0; i < 5; i++) {
    const date = nextDays[i].querySelector("p:first-of-type");
    const temp = nextDays[i].querySelector("p:last-of-type");

    date.textContent = `${obj.nextDaysForecast[i].datetime.slice(5, 10)}`;
    temp.textContent = `${obj.nextDaysForecast[i].temp} ºF`;
  }

  const tables = document.querySelector("#infoTable");
  const tableRows = tables.querySelectorAll("tr");

  tableRows.forEach((row) => {
    const data = row.querySelector("td:last-of-type");
    if (Object.keys(obj.currentInfo).includes(data.dataset.info)) {
      data.textContent = obj.currentInfo[data.dataset.info];
    }
  });

  rainGraph(obj.currentRainProbability);
}
