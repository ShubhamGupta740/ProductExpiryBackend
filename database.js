// var admin= require("firebase-admin");
// var serviceAccount=require("./serviceAccountKey.json");
// admin.initializeApp({
//   credential:admin.credential.cert(serviceAccount),
// });

// const dbConnection=admin.firestore();

const Firestore = require('@google-cloud/firestore');
 
  const dbConnection = new Firestore({
    projectId: 'cloud-first-hackathonproject21',
    keyFilename: './serviceAccountKey.json',
  });

  exports.dbConnection =dbConnection;
  