import React from "react";

const WeatherData = ({ weather, errorMessage }) => {
    if(errorMessage){
        return <div style={{marginTop: '10px'}}>{errorMessage}</div>;
    }

    if(!weather){
        return null;
    }


    return (
        <div className={"weather-list"}>
            <div>
                <div className={"weather-item"}><span>Location:</span> {weather.location}</div>
            </div>

            <div>
                <div className={"weather-item"}><span>Temperature:</span> {weather.temp} &#8451;</div>
            </div>

            <div>
                <div className={"weather-item"}><span>Humidity:</span> {weather.hum}</div>
            </div>

            <div>
                <div className={"weather-item"}><span>Condition:</span> {weather.condition}</div>
            </div>
        </div>
    )
}

export default WeatherData;
