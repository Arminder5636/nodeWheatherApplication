const request = require('request');

const forcast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/600efe875fc2ab6325bbd1738e6174c8/' + latitude + ',' + longitude + '?units=si';
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect',undefined);
        } else if (body.error) {
            callback('Unable to find location',undefined);
        } else {
            callback(undefined,`${body.daily.data[0].summary } It is currently ${body.currently.temperature} and probability of rain is ${body.currently.precipProbability}`);
        }
    })
}

module.exports = forcast;