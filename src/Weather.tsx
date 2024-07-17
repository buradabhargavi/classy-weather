import { Component } from "react";
import Day from "./Day";

interface weatherProps {
  weather: any;
  location: string;
}
class Weather extends Component<weatherProps> {
  componentWillUnmount(): void {
    console.log("component unmount");
  }
  render() {
    console.log(this.props.weather);
    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time: dates,
      weathercode: codes,
    } = this.props.weather;

    console.log(dates);
    return (
      <div>
        <h2>weather {this.props.location}</h2>
        <ul className="weather">
          {dates.map((date: string, i: number) => {
            return (
              <Day
                key={date}
                date={date}
                max={max.at(i)}
                min={min.at(i)}
                code={codes.at(i)}
                isToday={i === 0}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Weather;
