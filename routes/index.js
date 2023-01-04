var express = require('express');
var router = express.Router();
var weatherapi = require('../external-apis/weatherapi')
var db = require('../db/initDB')

/* GET home page. */
router.get('/', async function(req, res, next) {
  var apiRequest = await weatherapi.weatherRequest24(29.0222,41.0286)
  var sensordata = await db.getData();
  apiRequest.sensorTemp = sensordata.sensorTemp
  apiRequest.sensorTempMin = sensordata.sensorTempMin
  apiRequest.sensorTempMax = sensordata.sensorTempMax
  apiRequest.sensorHumidity = sensordata.sensorHumidity




  res.send(apiRequest)
});

module.exports = router;
