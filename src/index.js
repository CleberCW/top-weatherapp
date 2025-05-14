import "./styles.css";
import { retrieveWeatherData, weatherParser } from "./api.js";
import { renderData } from "./ui.js";
import info from "./data.json";

renderData(weatherParser(info));

document.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelector("#search");
  try {
    revenant(input.value);
  } catch (e) {
    console.log(`An error occurred: ${e}`);
  }
});

async function revenant(input) {
  const data = await retrieveWeatherData(input);
  const parsedData = weatherParser(data);
  renderData(parsedData);
}
