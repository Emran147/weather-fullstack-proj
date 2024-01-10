const express = require('express')
const router = express.Router()
const externalAPi = require('./externalAPI')
const weatherDataManager = require('../weatherDataManager')
const CityWeather = require('../model/Weather')


router.get("/Weather/:city", async function(req, res) {
    try {
      const city = req.params.city
      let cityWeather = await externalAPi.getWeather(city);
      cityWeather =  weatherDataManager.arrangeWeather(cityWeather)
      res.send(cityWeather);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch weather data' });
    }
  })


router.get("/Weather/", function(req, res) {
    try {
      CityWeather.find({}).then(function (weather) {
      res.send(weather)
      })
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch weather data' });
    }
  })


  router.post('/Weather', function (req, res) {
    const newWeather = new CityWeather(req.body)
    newWeather.save()
      .then((savedWeather) => {
          res.status(201).json(savedWeather)
      })
      .catch((err) => {
          console.error('Error saving expense:', err)
          res.status(500).send('Error saving expense')
      })
})


router.delete('/Weather/:cityName', async function (req, res) {
  const { cityName  } = req.params
  try {

      const city = await CityWeather.findOneAndDelete({ name: cityName } )
      if (!city) {
          return res.status(404).send(`No city found`)
      }

      return res.send(`city  ${cityName} deleted`)

  } catch (err) {
      console.error('Error updating expense:', err)
      return res.status(500).send('Error updating expense')
  }
})


module.exports = router