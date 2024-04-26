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
import current_location_icon from "../../Assets/current-location-icon.svg";

const api_key = process.env.REACT_APP_API_KEY;

function WeatherApp() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [position, setPosition] = useState({
    latitude: 51.5074,
    longitude: -0.1278,
  });

  useEffect(() => {
    fetchWeatherData(position.latitude, position.longitude);
  }, [position]);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const successHandler = (pos) => {
    setPosition({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    });
    fetchWeatherData(pos.coords.latitude, pos.coords.longitude);
  };

  const errorHandler = (error) => {
    console.error("Error getting current position:", error.message);
  };

  const handleSearchClick = async () => {
    const getSearchValue = document.getElementById("cityInput").value;
    try {
      const locationApiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${getSearchValue}&limit=1&appid=${api_key}`;
      const response = await fetch(locationApiURL);
      const locationData = await response.json();
      setPosition({
        latitude: locationData[0].lat,
        longitude: locationData[0].lon,
      });
      fetchWeatherData(locationData[0].lat, locationData[0].lon);
    } catch (err) {
      console.log("API ERROR: ", err);
    }
  };

  const fetchWeatherData = async (lat, lon) => {
    try {
      const weathApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;
      const weatherResponse = await fetch(weathApiURL);
      const weatherData = await weatherResponse.json();
      setData(weatherData);
      setLoading(false);
      console.log(data);
    } catch (err) {
      console.log("API ERROR: ", err);
    }
  };

  return (
    <>
      {loading ? (
        <div></div>
      ) : (
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
                handleGetLocation();
              }}
              className="locate-me"
            >
              <div className="current-location-icon">
                <img
                  width="24"
                  height="24"
                  src={current_location_icon}
                  alt=""
                />
              </div>
              <div className="locate-me-text">
                <p>Locate me</p>
              </div>
            </div>

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
          <div className="weather-temp">{Math.floor(data.main.temp)}°c</div>
          <div className="weather-location">{data.name}</div>
          <div className="data-container">
            <div className="element">
              <img src={humidity_icon} alt="" />
              <div className="data">
                <div className="humidity-percent">{data.main.humidity}%</div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={wind_icon} alt="" />
              <div className="data">
                <div className="humidity-percent">
                  {Math.round((data.wind.speed * 3600) / 1000)} km/h
                </div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WeatherApp;
