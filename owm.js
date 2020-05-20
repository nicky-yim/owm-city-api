const fetch = require('node-fetch');

const getWeatherData = async (lat, lon) => {
  const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`;

  return await fetch(`http://localhost:9080/test/`) /* fetch(URL) */
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

const getCurrent = (current) => {
  return {
    dt: current.dt,
    sunrise: current.sunrise,
    sunset: current.sunset,
    temp: current.temp,
    feels_like: current.feels_like,
    weather: {
      icon: current.weather.length > 0 ? current.weather[0].icon : null,
      description:
        current.weather.length > 0 ? current.weather[0].description : null,
    },
    rain: current.weather.rain,
    snow: current.weather.snow,
  };
};

const getDaily = (daily) => {
  return {
    dt: daily.dt,
    temp: daily.temp,
    feels_like: daily.feels_like,
    weather: {
      icon: daily.weather.length > 0 ? daily.weather[0].icon : null,
      description:
        daily.weather.length > 0 ? daily.weather[0].description : null,
    },
  };
};

const processData = (data) => {
  return {
    current: getCurrent(data.current),
    daily: data.daily.map((d) => getDaily(d)),
  };
};

const get = async (lat, lon) => {
  return await getWeatherData(lat, lon).then((data) => processData(data));
};

/*let count = sample.daily.length;
  let temp = 0.0;

  for (var daily of sample.daily) {
    console.log(daily.temp.min);
    temp += daily.temp.min;  
  }

  console.log("Average min temp:", temp);*/

module.exports = { get };
