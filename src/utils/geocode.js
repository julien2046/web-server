const request = require('request');

const geocode = (address, callback) => {
  const addressStringify = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressStringify}.json?access_token=pk.eyJ1IjoicmF0dXNhbGVtIiwiYSI6ImNraTZoZTRvMTF6MTQycm1zbzJvdHoxMWQifQ.33ND0i6ruAhTUDdHQs53vg&limit=1`

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      console.log('Unable to connect to location services!')
      return;
    }
    
    if (body.features.length === 0) {
      console.log('Unable to connect to location!')
      return;
    }
 
    const { center, place_name } = body.features[0];
    callback({
      latitude: center[0],
      longitude: center[1],
      location: place_name,
      address: addressStringify,
    })
  })
}

module.exports = geocode;