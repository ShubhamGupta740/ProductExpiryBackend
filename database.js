// let mysql = require('mysql');

// let dbConnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'bulk_mailer_db'
// });

// dbConnection.connect(function(err) {
//     if (err) {
//       return console.error('error: ' + err.message);
//     }
  
//     console.log('Connected to the MySQL server.');
//   })
var admin= require("firebase-admin");
var serviceAccount=require("./serviceAccountKey.json");
admin.initializeApp({
  credential:admin.credential.cert(serviceAccount),
});

const dbConnection=admin.firestore();

  exports.dbConnection =dbConnection;
  