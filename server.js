var bodyParser = require("body-parser");
var cors = require("cors");
const express = require("express");
const app = express();
var LoginService = require("./src/services/login/LoginService").LoginService;
// var SignUpService =
//   require("./src/services/signUp/SignUpService").SignUpService;
var AddProductService =
  require("./src/services/addproduct/AddProductService").AddProductService;
var PushNotificationService =
  require("./src/croneJobs/PushNotificationService").PushNotificationService;
// var UpdateFBTokenService =
//   require("./src/services/updatefbToken/UpdateFBTokenService").UpdateFBTokenService;

// intialize all the dependencies.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// import and initialize the service

new LoginService(app);
// new SignUpService(app);
new AddProductService(app);
new PushNotificationService(app);
// new UpdateFBTokenService(app);

app.get("/test", (req, res) => {
  res.send("hello");
});
const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
