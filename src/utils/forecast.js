const request = require('request')

const access_key = '5f5d53439d75e6182b5ee6347c060b92'
const units='f'

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + access_key + '&query=' + latitude + ',' + longitude + '&units=' + units

    request({ url, json:true, unit:"f" }, (error, {body}) => {
        if (error) {
            callback(`Unable to connect to weather service: ${error} `, undefined);
        } else if (body.location.name === null) {
            callback(`No such address found for "${request.query}" !`, undefined);
        } else {
            const message = `It is currently ${body.current.weather_descriptions[0]}, `
            + `temperature is ${body.current.temperature} degrees, `
            + `humidity is ${body.current.humidity} percent, ` 
            + `the wind speed is ${body.current.wind_speed} mph from ${body.current.wind_dir} `
            + `and it feels like ${body.current.feelslike} degrees. `
            callback(undefined, message);
        }
    });
}

module.exports = forecast;