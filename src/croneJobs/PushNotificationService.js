const cron = require('node-cron');
//var CronJob = require('cron').CronJob;
var sendNotification = require('../utils/Fcm.js').sendNotification

var dbConnection = require('../../database').dbConnection

var PushNotificationService = function (app) {
  var task = cron.schedule("0 */50 * * * *", () => {
    let productRef = dbConnection.collection("productList");
    console.log("Hi job started");

    productRef.get().then((querySnapshot) => {
      let result = [];
      querySnapshot.forEach((document) => {
        result.push(document.data());
      });
      if (result.length > 0) {
        let filteredResult = [];
        var today = new Date();
        for (let i = 0; i < result.length; i++) {
          var exday = new Date(result[i].expiryDate);
          console.log(Math.ceil((exday - today) / (1000 * 3600 * 24)));
          if (Math.ceil((exday - today) / (1000 * 3600 * 24)) == 7) {
            filteredResult.push(result[i]);
          }
        }
        console.log(filteredResult);
        if(filteredResult.length>0){
        sendNotification(filteredResult);
        }
      }
    });
  });
};
exports.PushNotificationService=PushNotificationService;