function Weather({ weatherData }){
    if (!weatherData) {
        return null; // or return a loading indicator
    }
    return (
        <>
            <div className="weather">
                <div className="left">
                    <div className="current-temp">{weatherData.currentTemp}</div>
                    <div className="left-bottom">
                        <div className="max-temp">{weatherData.maxTemp}</div>
                        <div className="min-temp">{weatherData.minTemp}</div>
                    </div>
                </div>
                <div className="right">
                    <div className="date">{weatherData.date}</div>
                    <div className="icon">
                        <span className="symbol">{weatherData.icon}</span>
                    </div>
                </div>
            </div>
        </>
    ) 
}

export default Weather;