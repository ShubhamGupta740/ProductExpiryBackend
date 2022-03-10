const {body,validationResult, check} =  require('express-validator');
var UpdateFBTokenProvider=require('./UpdateFBTokenProvider').UpdateFBTokenProvider;
const {auth} = require("../../middleware/auth");
var ROUTES = require("../../api-routes/Routes").ROUTES;

var UpdateFBTokenService = function(app){

    var updateFBTokenProvider= new UpdateFBTokenProvider();
    
    app.post(ROUTES.UPDATE_TOKEN,auth,body("token").exists(),(req,res)=>{
        updateFBTokenProvider.updateToken(function(err,response){
            res.send(response);
        },req.body)
    })
}
exports.UpdateFBTokenService=UpdateFBTokenService;