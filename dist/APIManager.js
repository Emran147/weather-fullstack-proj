class APIManager {
    constructor(){}
    
    async getCityWeather(city){
      const cityWeather =  await $.get(`/Weather/${city}`)
      return cityWeather
    }
    async getSavedCities(){
        const savedCities = await $.get(`/Weather`)
        console.log(savedCities)
        return savedCities
    }

    async saveCity() {
      try {
          const currentCity = await getCurrent()
          const savedCity = await $.post('/Weather',  currentCity)
          return savedCity
      } catch (error) {
          console.error('Error occurred while saving city:', error)
          return null
      }
  }
  

}