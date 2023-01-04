const { response } = require('express');
const request = require('request-promise-native')
require('dotenv').config({path:'../.env'});
const mode = 'json'
const cnt = 24
const apiURL = "https://api.openweathermap.org/data/3.0/onecall?"
var api_key = "b441b6c7da157de731f38a37f628335e"

var httpReturn = require('./returnTemplate.json')



var weatherRequest24Hour = async (long,latt) =>{

   var callURL = `${apiURL}lat=${latt}&lon=${long}&appid=${api_key}&exclude=current,minutely,daily,alerts&units=metric`

   let options = {url:callURL, json:true}
   let response = await request(options)
   
   dataDump(httpReturn,response)
   return httpReturn;
   

}

function dataDump(dumpVar,responseVar) {
   for (i = 0; i < 24; i++) {
      dumpVar.hourlyWeatherData[i].temp = responseVar.hourly[i].temp;
      dumpVar.hourlyWeatherData[i].humidity = responseVar.hourly[i].humidity;
      dumpVar.hourlyWeatherData[i].skytext = responseVar.hourly[i].weather.main;
   }
}


module.exports= {
    weatherRequest24: weatherRequest24Hour
}