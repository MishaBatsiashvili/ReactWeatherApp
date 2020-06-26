import * as axios from "axios";

export const getWeather = (city) => {
    return axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=00f6daa7f916ccf5b37f9d32350b67a4`)
        .then(result => {
            result = result.data;
            return {
                location: result.name + ', ' + result.sys.country,
                temp: result.main.temp,
                hum: result.main.humidity,
                condition: result.weather[0].description
            };
        })
        .catch((err) => {
            return err.response;
        })
}