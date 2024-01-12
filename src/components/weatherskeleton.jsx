import './weather.css'

function WeatherSkeleton() {
    return (
        <div className="skeleton">
            <div className="left">
                <div className="current-temp"></div>
                <div className="left-bottom">
                    <div className="max-temp"></div>
                    <div className="min-temp"></div>
                </div>
            </div>
            <div className="right">
                <div className="date"></div>
                <div className="icon">
                    <div className="symbol"></div>
                </div>
            </div>
        </div>
    );
}

export default WeatherSkeleton;