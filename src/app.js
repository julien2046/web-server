const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

// Initialize express
const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

// Setup path for static assets
app.use(express.static(publicDir));

// Routes of the application
app.get('', (request, response) => {
  response.render('index', {
    title: 'Weather App',
    name: 'Julien Banchetti'
  })
})

app.get('/about', (request, response) => {
  response.render('about', {
    title: 'About Me',
    name: 'Julien Banchetti'
  })
})

app.get('/help', (request, response) => {
  response.render('help', {
    title: 'Help',
    message: 'This is some helpful message.',
    name: 'Julien Banchetti'
  })
})

app.get('/weather', (request, response) => {
  if (!request.query.address) {
    return response.send({
      error: 'You must provide a search term'
    });
  }

  geocode(request.query.address, (data) => {
    weather(data, ({ forecast, latitude, longitude, location } = {}) => {
      response.send({
        forecast,
        latitude,
        longitude,
        location
      });
    })
  })
})

app.get('/help/*', (request, response) => {
  response.render('error', {
    message: 'Help article not found'
  })
})


app.get('*', (request, response) => {
  response.render('error')
})

// Server is listening the port 3000
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
