import './weather.css'

function Weather({ currentTemp, maxTemp, minTemp, date, icon }) {
    if (currentTemp === undefined || maxTemp === undefined || minTemp === undefined || date === undefined || icon === undefined) {
        return null; // or return a loading indicator
    }
    return (
        <>
            <div className="weather">
                <div className="left">
                    <div className="current-temp">{currentTemp} °C</div>
                    <div className="left-bottom">
                        <div className="max-temp">↑ {maxTemp} °C</div>
                        <div className="min-temp">↓ {minTemp} °C</div>
                    </div>
                </div>
                <div className="right">
                    <div className="date">{date}</div>
                    <div className="icon">
                        <span className="symbol">{icon}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Weather;