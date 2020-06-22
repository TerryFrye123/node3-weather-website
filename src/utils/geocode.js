const request = require('request')

const geocode = (address, callback) => {
    const limit = 1
    const access_token = 'pk.eyJ1Ijoic2hhbXdvdzEyMyIsImEiOiJja2FuYmJnY2gxbnplMnhsZW13b2t6OWNoIn0.vHmme3eq5jLeZbmEhIKg5A'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=' + limit + '&access_token=' + access_token;

    request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback(`Unable to call mapping service: ${error}`, undefined);
        } else if (body.features.length === 0) {
            callback(`No such address found for "${address}", Try another location !`, undefined);
        } else {
                callback(undefined, { latitude: body.features[0].center[1], longitude: body.features[0].center[0], location: body.features[0].place_name });
        }
    })
}

module.exports = geocode;