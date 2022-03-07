const cron = require('node-cron');
//var CronJob = require('cron').CronJob;
var sendNotification = require('../utils/Fcm.js').sendNotification

var dbConnection = require('../../database').dbConnection

var PushNotificationService= function(app){
    var task = cron.schedule('0 */10 * * * *', () => {
        let productRef = dbConnection.collection("productList");
        console.log("Hi job started")    

// prints date & time in YYYY-MM-DD format
// console.log(year + "-" + month + "-" + date);
        productRef.where("purchaseDate","==","4/3/2022")
        .get()
        .then((querySnapshot)=>{
            let result=[];
            querySnapshot.forEach((document) => {
                result.push(document.data());
            })
            if(result.length>0){
                console.log(result)
                sendNotification(result);
            }
        })
    });
}
exports.PushNotificationService=PushNotificationService;