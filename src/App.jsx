import React, { useState, useEffect } from 'react';
import './App.css';
import Weather from './components/weather';
import WeatherSkeleton from './components/weatherskeleton';


function App() {
  const [time, setTime] = useState({
    hours: '',
    minutes: '',
    seconds: ''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [todayWeather, setTodayWeather] = useState({});
  const [tomorrowWeather, setTomorrowWeather] = useState({});
  const [lastWeather, setLastWeather] = useState({});
  const [longitude, setLongitude] = useState(localStorage.getItem('Longitude') || '');
  const [latitude, setLatitude] = useState(localStorage.getItem('Latitude') || '');
  const [isLoading, setIsLoading] = useState(true);

  const padTime = (time) => (time < 10 ? "0" + time : time);

  useEffect(() => {
    const updateClock = () => {
      let now = new Date();
      let hours = padTime(now.getHours()) + ":";
      let minutes = padTime(now.getMinutes()) + ":";
      let seconds = padTime(now.getSeconds());

      setTime({ hours, minutes, seconds });
    };

    const intervalId = setInterval(updateClock, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      window.open("https://www.google.com/search?q=" + encodeURIComponent(searchQuery), "_blank");
      setSearchQuery("");
    }
  };
  
  const getPosition = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      console.log("Position in");
      navigator.geolocation.getCurrentPosition((position) => {
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
        localStorage.setItem('Longitude', position.coords.longitude);
        localStorage.setItem('Latitude', position.coords.latitude);
        console.log("Position out");
        getWeather();
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getPosition();
  }, []);

  const getWeather = () => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&13.41&current=temperature_2m,is_day,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&forecast_days=3`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTodayWeather({
          currentTemp: Math.round(data.current.temperature_2m),
          maxTemp: Math.round(data.daily.temperature_2m_max[0]),
          minTemp: Math.round(data.daily.temperature_2m_min[0]),
          date: formatDate(data.daily.time[0]),
          icon: switchIcon(data.current.weather_code),
        });
        setTomorrowWeather({
          currentTemp: Math.round((data.daily.temperature_2m_max[1] + data.daily.temperature_2m_min[1])/2),
          maxTemp: Math.round(data.daily.temperature_2m_max[1]),
          minTemp: Math.round(data.daily.temperature_2m_min[1]),
          date: formatDate(data.daily.time[1]),
          icon: switchIcon(data.daily.weather_code[1]),
        });
        setLastWeather({
          currentTemp: Math.round((data.daily.temperature_2m_max[2] + data.daily.temperature_2m_min[2])/2),
          maxTemp: Math.round(data.daily.temperature_2m_max[2]),
          minTemp: Math.round(data.daily.temperature_2m_min[2]),
          date: formatDate(data.daily.time[2]),
          icon: switchIcon(data.daily.weather_code[2]),
        });
        setIsLoading(false);
      })
      .catch(error => console.error("Error fetching weather data:", error));
  };

  useEffect(() => {
    getWeather();
  }, []);
  
  const switchIcon = (id) => {
    const IconMap = {
      0: 'clear_day',
      1: 'clear_day',
      2: 'partly_cloudy_day',
      3: 'cloud',
      45: 'foggy',
      48: 'foggy',
      51: 'rainy',
      53: 'rainy',
      55: 'rainy',
      56: 'weather_mix',
      57: 'weather_hail',
      61: 'rainy',
      63: 'rainy',
      65: 'rainy',
      66: 'weather_mix',
      67: 'weather_hail',
      71: 'cloudy_snowing',
      73: 'cloudy_snowing',
      75: 'cloudy_snowing',
      77: 'weather_mix',
      80: 'rainy',
      81: 'rainy',
      82: 'thunderstorm',
      85: 'cloudy_snowing',
      86: 'cloudy_snowing',
      95: 'thunderstorm',
      96: 'thunderstorm',
      99: 'thunderstorm',
    };
    let Ico;
    if (id in IconMap) {
      Ico = IconMap[id];
    }
    return Ico;
  };

  const formatDate = (inputDate) => {
    const parts = inputDate.split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day}.${month}.${year}`;
    } else {
      console.error("Invalid date format");
      return inputDate;
    }
  };

  return (
    <>
      <div className="Search">
        <div className="clock">
          <span id="clock">{time.hours}{time.minutes}{time.seconds}</span>
        </div>
        <div className="search-bar">
          <div className="search-animation">
            <span id="search-animation"></span>
          </div>
          <input
            type="text"
            id="search-input"
            placeholder="Search on Google"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className="weathercards">
  {isLoading ? <WeatherSkeleton /> :
    <Weather    
      currentTemp={todayWeather.currentTemp}
      maxTemp={todayWeather.maxTemp}
      minTemp={todayWeather.minTemp}
      date={todayWeather.date}
      icon={todayWeather.icon}
    />}
  {isLoading ? <WeatherSkeleton /> :
  <Weather    
      currentTemp={tomorrowWeather.currentTemp}
      maxTemp={tomorrowWeather.maxTemp}
      minTemp={tomorrowWeather.minTemp}
      date={tomorrowWeather.date}
      icon={tomorrowWeather.icon}
    />}
  {isLoading ? <WeatherSkeleton /> :
    <Weather    
      currentTemp={lastWeather.currentTemp}
      maxTemp={lastWeather.maxTemp}
      minTemp={lastWeather.minTemp}
      date={lastWeather.date}
      icon={lastWeather.icon}
    />}
</div>
    </>
  );
}
export default App;