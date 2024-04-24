import "./WeatherApp.css";
import { useState, useEffect } from "react";
import search_icon from "../../Assets/search.png";
import clear_icon from "../../Assets/clear.png";
import clound_icon from "../../Assets/cloud.png";
import drizzle_icon from "../../Assets/drizzle.png";
import humidity_icon from "../../Assets/humidity.png";
import rain_icon from "../../Assets/rain.png";
import snow_icon from "../../Assets/snow.png";
import wind_icon from "../../Assets/wind.png";

const api_key = process.env.REACT_APP_API_KEY;

function WeatherApp() {
  const [data, setData] = useState(null);
  async function handleSearchClick() {
    const getSearchValue = document.getElementById("cityInput").value;
    console.log(getSearchValue);
    const locationApiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${getSearchValue}&limit=1&appid=${api_key}`;
    try {
      const response = await fetch(locationApiURL);
      const locationData = await response.json();
      // console.log(locationData);

      const weathApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${locationData[0].lat}&lon=${locationData[0].lon}&appid=${api_key}`;
      const weatherResponse = await fetch(weathApiURL);
      const weatherData = await weatherResponse.json();
      console.log(weatherData);
    } catch (err) {
      console.log("API ERROR: ", err);
    }
  }

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="search"
          name=""
          id="cityInput"
        />
        <div
          onClick={() => {
            handleSearchClick();
          }}
          className="search-icon"
        >
          <img src={search_icon} alt="Search Icon" />
        </div>
      </div>
      <div className="weather-image">
        <img src={clound_icon} alt="" />
      </div>
      <div className="weather-temp">24°c</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" />
          <div className="data">
            <div className="humidity-percent">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
