export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const filterWeatherData = (weatherData) => {
  const result = {};
  result.city = weatherData.name;
  result.temp = {
    F: weatherData.main.temp,
    C: Math.round(((weatherData.main.temp - 32) * 5) / 9),
  };
  result.type =
    result.temp.F >= 86 ? "hot" : result.temp.F >= 66 ? "warm" : "cold";
  result.condition = weatherData.weather[0].main.toLowerCase();
  result.isDay = isDay(weatherData.sys, Date.now());
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  const currentTime = now;
  const sunriseMs = sunrise * 1000;
  const sunsetMs = sunset * 1000;

  return currentTime >= sunriseMs && currentTime <= sunsetMs;
};
