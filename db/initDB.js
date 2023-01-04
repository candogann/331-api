
var admin = require("firebase-admin");
require('dotenv').config();
var serviceAccount = require('./service_account.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});


// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref();

async function getSensorData() {
  var sensorData;
await ref.once("value", function(snapshot) {
  sensorData = snapshot.val();
});
//console.log(sensorData)
return sensorData
}

async function processData() {
  var data = await getSensorData();
  data = data.test
  var length = Object.keys(data).length;
  var dataArray = []

  var returnJSON = {}

  Object.keys(data).forEach(element => {
    dataArray.push(data[element])
    
  });
  length = length-1
  returnJSON.sensorTemp =dataArray[length].temperature
  returnJSON.sensorHumidity =dataArray[length].humidity
  returnJSON.sensorTempMin =dataArray[length].temperature
  returnJSON.sensorTempMax =dataArray[length].temperature
  for(var i = 0; i<16;i++) {

    if(returnJSON.sensorTempMax < dataArray[length-i].temperature) {
      returnJSON.sensorTempMax = dataArray[length-i].temperature
    }
    if(returnJSON.sensorTempMin > dataArray[length-i].temperature) {
      returnJSON.sensorTempMax = dataArray[length-i].temperature
    }
  }
  return returnJSON
}



module.exports = {
  getData : processData
}


