const APImanager = new APIManager()

const saveCurrent = function(currentCity){
localStorage.setItem('myData', JSON.stringify(currentCity))   
}
const getCurrent = function(){
    const retrievedObject = JSON.parse(localStorage.getItem('myData'))
    return retrievedObject
}

const searchCityWeather = async function () {
    const city = $('#cityInput').val()
    if (!city.replace(/\s/g, '').length) {
        alert('Check the input')
    } else {
        try {
            const cityWeatherObj = await APImanager.getCityWeather(city)
            const savedCities = await APImanager.getSavedCities()
            saveCurrent(cityWeatherObj)
            renderFunc(savedCities, cityWeatherObj)
        } catch (error) {
            console.error('Error occurred while fetching data:', error)
        }
    }
}

const saveCity = async function () {
    await APImanager.saveCity()
    const savedCities = await APImanager.getSavedCities()
    renderFunc(savedCities)
}

const deleteCity = async function (cityName) {
    console.log(cityName);

}

const renderFunc =   function(savedCities, cityWeatherObj){
    const renderer = new Renderer('container', 'Weather-template')
    renderer.render(savedCities, cityWeatherObj)
}

renderFunc({})

