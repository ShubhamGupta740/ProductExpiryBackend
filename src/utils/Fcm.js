
    var FCM = require('fcm-node');
    var serverKey = 'AAAAs3tIEag:APA91bFzMztM7qwzkZQM8chFemtAKJyTNw_HqUc1f_8NH5o0hsLUQn91VEXqcnSVTHlrMy4498VmqUvDygT2viJ8cqqiFjyZABJ32MpAXCAPJP5s4ZrC-_e9WEQYkLeZRPZ7US_0BxFA';
    var fcm = new FCM(serverKey);

    var sendNotification=function(result){
        console.log(result[0].productType)
    var message = {
	to:'<DEVICE_TOKEN>',
        notification: {
            title: 'ProductExpiryApp',
            body: '{"Message from ProductExpiryApp"}',
        },

        data: { //you can send only notification or only data(or include both)
            title: 'ok cdfsdsdfsd',
            // body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
            body:'{"Product": result[0].productName, "Expiry Date": result[0].expiryDate}'
        }

    };
    console.log("Hello inside FCM")

    // fcm.send(message, function(err, response) {
    //     if (err) {
    //         console.log("Something has gone wrong!"+err);
	// 		console.log("Respponse:! "+response);
    //     } else {
    //         // showToast("Successfully sent with response");
    //         console.log("Successfully sent with response: ", response);
    //     }

    // });
}

exports.sendNotification=sendNotification;