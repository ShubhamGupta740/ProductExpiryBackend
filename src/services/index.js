var LoginService=require('../services/login/LoginService').LoginService;
var SignUpService=require('../services/signUp/SignUpService').SignUpService;
var AddProductService=require('../services/addproduct/AddProductService').AddProductService;
var PushNotificationService=require('../croneJobs/PushNotificationService').PushNotificationService;
var UpdateFBTokenService=require('../services/updatefbToken/UpdateFBTokenService').UpdateFBTokenService;
//var AddProductService=require().AddProductService;

var AddServices=function(app){
    new LoginService(app);
    new SignUpService(app);
    new AddProductService(app);
    new PushNotificationService(app);
    new UpdateFBTokenService(app);
}
exports.AddServices=AddServices;