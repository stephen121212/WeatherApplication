const readlineSync = require('readline-sync');
const request = require('postman-request');
const fs = require('fs')

const getbyCountryCode = () => {
    cityName = readlineSync.question('Name of City? ');
    countryCode = readlineSync.question('Country Code? ');
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + ',' + countryCode + '&APPID=6c1ac23921559b3a3fd8ebbd9ecb5646'
    request(url, function (error, response, body) {
        if(error){
        console.log('Error: Connecting to service', error); // Print the error if one occurred
          } else if (response.statusCode === 200) {
              loadWeatherForeCast(body)
              getWeatherForeCast();
              } 
              else {
                      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                      console.log('body:', body); // Print the HTML for the Google homepage.
                  }
  })
}

const getLongitudeAndLatitude = () => {
    latitude = readlineSync.question('Latitude? ');
    longitude = readlineSync.question('Longitude? ');
    var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=6c1ac23921559b3a3fd8ebbd9ecb5646'
    request(url, function (error, response, body) {
        if(error){
        console.log('Error: Connecting to service', error); // Print the error if one occurred
          } else if (response.statusCode === 200) {
              loadWeatherForeCast(body)
              getWeatherForeCast();
              } 
              else {
                      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                      console.log('body:', body); // Print the HTML for the Google homepage.
                  }
  })
}

const getbyCityName = () => {
    cityName = readlineSync.question('City Name? ');
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&APPID=6c1ac23921559b3a3fd8ebbd9ecb5646'
    request(url, function (error, response, body) {
        if(error){
        console.log('Error: Connecting to service', error); // Print the error if one occurred
          } else if (response.statusCode === 200) {
              loadWeatherForeCast(body)
              getWeatherForeCast();
              } 
              else {
                      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                      console.log('body:', body); // Print the HTML for the Google homepage.
                  }
  })
}

const getInputFromUser = () =>{
    var gettingInput = readlineSync.question('Do you want to search by \n1)Country or \n2)City Name?\n3)Latitude And Longitude?\n'); 
    var input = parseInt(gettingInput)
    switch(input){
        case 1: getbyCountryCode()
        break
        case 2: getbyCityName()
        break
        case 3: getLongitudeAndLatitude()
        break
        default: console.log('You have not entered a valid number')
    }
}

const checkFileExists = (weather) => {
    fileExists()
}

const printWeatherForecast = (weatherObject) => {
    var temperatureValue = calculateTemperature(weatherObject)
    console.log('Name of City: ' + weatherObject.name)
    console.log('Country of City: ' + weatherObject.sys.country)
    console.log('Weather currently: ' + weatherObject.weather[0].main)
    console.log('Description of Weather: ' + weatherObject.weather[0].description)
    console.log('Temperature: ' + temperatureValue + '°C')
    console.log('Humidity: ' + weatherObject.main.humidity + '%') 
}

const calculateTemperature = (weatherObject) => {
    var temperatureValue = (weatherObject.main.temp - 273.15).toFixed(2)
    return temperatureValue
}

const fileExists = () => {
    try{
        if(fs.existsSync('./weather.json')){
            const dataBuffer = fs.readFileSync('weather.json')
            const weatherObject = JSON.parse(dataBuffer)
            printWeatherForecast(weatherObject)
        } 
    } catch(err){
        console.error(err)
    }
}

const loadWeatherForeCast = (body) => {
    fs.writeFileSync('weather.json', body)
}

const getWeatherForeCast = () => {
    if(fs.existsSync('./weather.json')){
        const weather = require('./weather')
        checkFileExists(weather)
    } else {
        request
      .get('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&APPID=6c1ac23921559b3a3fd8ebbd9ecb5646')
      .on('error', function(err) {
        console.log(err)
      })
      .pipe(fs.createWriteStream('weather.json'))
    }
}


module.exports = {
    getInputFromUser: getInputFromUser,
    getWeatherForeCast: getWeatherForeCast,
    loadWeatherForeCast: loadWeatherForeCast,
    fileExists: fileExists,
    printWeatherForecast: printWeatherForecast,
    checkFileExists:checkFileExists
} 