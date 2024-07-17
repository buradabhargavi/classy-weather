import React, { Component } from "react";
import Weather from "./Weather";

interface state {
  location: string;
  isLoading: boolean;
  displayLoaction: string;
  weather: any;
}

function convertToFlag(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

class App extends Component<{}, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      location: "Lisbon",
      isLoading: false,
      displayLoaction: "",
      weather: {},
    };
    this.fetchWeather = this.fetchWeather.bind(this);
  }

  async fetchWeather() {
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const data = await res.json();
      if (!data.results) throw new Error("loaction not found");
      const { name, latitude, longitude, country_code, timezone } =
        data.results[0];
      console.log(name, latitude, longitude, country_code, timezone);
      console.log("latitude", latitude);
      this.setState({
        displayLoaction: `${name} ${convertToFlag(country_code)}`,
      });
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      console.log(weatherData.daily);

      this.setState({ weather: weatherData.daily });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    console.log("the weather is:", this.state.weather.weathercode);
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <div>
          <input
            type="text"
            placeholder="Search from loaction..."
            value={this.state.location}
            onChange={(e) => this.setState({ location: e.target.value })}
          ></input>
        </div>
        <button onClick={this.fetchWeather}>Search weather</button>
        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            location={this.state.displayLoaction}
          ></Weather>
        )}
      </div>
    );
  }
}

export default App;
