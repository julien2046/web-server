const request = require('request');

const weather = ({ latitude, longitude, location, address } = {}, callback) => {
  const addressStringify = encodeURIComponent(address);
  const url = `http://api.weatherstack.com/current?access_key=d57c64f7f4ffaae989c715ef6dada254&query=${addressStringify}`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      console.log('Unable to connect to location services!')
      return;
    }

    const { temperature, precip, weather_descriptions } = body.current;
    callback({
      forecast: `${weather_descriptions[0]}: It is currently ${temperature} degrees and there is ${precip * 100}% chances of rain. Latitude is ${latitude} and longitude is ${longitude}`,
      latitude,
      longitude,
      location
    });
  });
}

module.exports = weather;