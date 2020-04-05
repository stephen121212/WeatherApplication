const fs = require('fs')
const request = require('postman-request');

request('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=6c1ac23921559b3a3fd8ebbd9ecb5646', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  loadWeatherForeCast(body)
  getWeatherForeCast()
});

const printWeatherForecast = (weather) => {
    fileExists()
}

const fileExists = () => {
    try{
        if(fs.existsSync('./weather.json')){
            const dataBuffer = fs.readFileSync('weather.json')
            const weatherObject = JSON.parse(dataBuffer)
            console.log(weatherObject.coord.lat + ' ' + weatherObject.coord.lon)
        } else{
            console.log('Error occured')
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
        printWeatherForecast(weather)
    } else {
        request
      .get('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=6c1ac23921559b3a3fd8ebbd9ecb5646')
      .on('error', function(err) {
        console.log(err)
      })
      .pipe(fs.createWriteStream('weather.json'))
    }
}
