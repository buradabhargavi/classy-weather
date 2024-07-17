import React from "react";
interface dateProps {
  date: string;
  max: number;
  min: number;
  code: string;
  isToday: boolean;
}

function formatDay(dateStr: string) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

function getWeatherIcon(wmoCode: string) {
  const icons = new Map<number[], string>([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  let foundKey: number[] | undefined;
  icons.forEach((value, key) => {
    if (key.includes(parseInt(wmoCode))) {
      foundKey = key;
    }
  });

  if (!foundKey) return "NOT FOUND";
  return icons.get(foundKey);
}

class Day extends React.Component<dateProps> {
  render() {
    const { date, max, min, code, isToday } = this.props;
    return (
      <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p>{isToday ? "Today" : formatDay(date)}</p>
        <p>
          {Math.floor(min)}&deg; &mdash; {Math.floor(max)}&deg;
        </p>
      </li>
    );
  }
}

export default Day;
