const request = require('request');

const geocode = (address, callback) => {
    const url = ' https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXJtaW5kZXJzaW5naCIsImEiOiJjanlsc2xxczgwYXM0M2Nub24zMjNwNmoyIn0.nc0JX8EcIw4CIgBQPAqG2Q&limit=1'
    request({ url, json: true }, (error, {body}) => {
       if (error) {
          callback('Unable to connect location services', undefined);
       } else if (body.features.length === 0) {
          callback('Unable to find Your Location.Try Another Search term.', undefined);
       } else {
          callback(undefined, {
             latitude: body.features[0].center[1],
             longitude: body.features[0].center[0],
             location: body.features[0].place_name
          })
       }
    })
 }

 module.exports = geocode;