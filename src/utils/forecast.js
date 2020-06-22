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
            callback(undefined,`It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`);
        }
    });
}

module.exports = forecast;