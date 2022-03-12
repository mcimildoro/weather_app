import React, { useState } from "react";
import moment from "moment";
//import Img from './../assests/icons/'
import "./WeatherForm.css";

export default function WeatherForm(props) {
  const [disable, setDisable] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [show, setShow] = useState(true);

  const getWeather = async (ev) => {
    ev.preventDefault();
    const { city } = ev.target.elements;
    const cityValue = city.value;
    const apiKey = "59cf256f703b41eba2be17be72fa7249";
    const API_URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityValue}&key=${apiKey}&lang=en&days=9`;

    const response = await fetch(API_URL);
    const data = await response.json();

    const icon = data.data[0].weather.icon;
    const con_url = `https://www.weatherbit.io/static/img/icons/${icon}.png`;

    console.log(data);
    // https://www.weatherbit.io/static/img/icons/r01d.png
    setWeatherData({
      city: data.city_name,
      temperature: `${Math.trunc(data.data[0].temp)}°`,
      description: data.data[0].weather.description,
      max_temp: `${Math.trunc(data.data[0].high_temp)}°`,
      min_temp: `${Math.trunc(data.data[0].min_temp)}°`,
      Date: moment(data.data[0].datetime).format("MMMM DD, YYYY", true),
      icon: con_url,
      nextDays: data.data,
    });
  }; // end function WeatherForm

  // funcion de filtro y map para obtener el pronostico de la semana
  const getNextDays = (days) =>
    days
      .filter((days) => days.datetime > moment().format("YYYY-MM-DD"))
      .map((day, i) => (
        <div
          key={i}
          className="card card-body col-sm-auto ml-2 mh-100 d-inline-block text-center mb-2"
        >
          <span className="badge badge-pill badge-info text-center">
            {moment(day.datetime).format("dddd, DD")}
          </span>
          <div className="mb-0 display-4">{`${Math.trunc(day.temp)}°`}</div>
          <div className="mb-0 d-flex">
            <div className="mb-0 col-sm-auto d-flex">
              {"Max." + `${Math.trunc(day.max_temp)}°`}
            </div>
            {"Min." + `${Math.trunc(day.min_temp)}°`}
          </div>
          <h6 className="text-center title_text">{day.weather.description}</h6>
        </div>
      ));

  const handleInput = (e) => {
    if (e.target.value && e.target.value.length >= 3) {
      setDisable(false);
    } else {
      setWeatherData(null);
      setDisable(true);
      setShow(true);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="card card-body col- mb-4">
            <form onSubmit={getWeather}>
              <div className="input-group mb-3 ">
                <input
                  className="form-control"
                  name="city"
                  type="text"
                  placeholder="Introduzca una ciudad..."
                  onChange={handleInput}
                  autoFocus
                />
              </div>

              {show ? (
                ""
              ) : (
                <div className="list-group list-group-flush">
                  <h1 className="mb-0">{weatherData && weatherData.city}</h1>
                  <div className="display-4  d-flex ml-5">
                    {weatherData && weatherData.temperature}
                    <img
                      className="img_forecast"
                      src={weatherData && weatherData.icon}
                    />
                  </div>
                  <h5>{weatherData && weatherData.description}</h5>
                  <h5 className="title_text">
                    {weatherData && "Max." + weatherData.max_temp}
                    {weatherData && " Min." + weatherData.min_temp}
                  </h5>
                  <div className="badge badge-light order">
                    {weatherData && weatherData.Date}
                  </div>
                </div>
              )}

              <button
                className="btn btn-success btn-block"
                disabled={disable}
                onClick={() => {
                  setShow(!show);
                }}
              >
                Get Weather
              </button>
            </form>
          </div>
        </div>
        {show ? (
          ""
        ) : (
          <div className="row">
            {weatherData && getNextDays(weatherData.nextDays)}
          </div>
        )}
      </div>
    </>
  );
}
