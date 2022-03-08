const { body, validationResult } = require("express-validator");
var ROUTES = require("../../api-routes/Routes").ROUTES;
const {auth} = require("../../middleware/auth");
const { STRINGS } = require("../../utils/Strings");
var getErrorModel = require('../../utils/Utils').getErrorModel;
var getSuccessModel = require('../../utils/Utils').getSuccessModel;
var SignUpProvider = require('./SignUpProvider').SignUpProvider;


var SignUpService = function (app) {
    var signUpProvider = new SignUpProvider();
    app.post(ROUTES.SIGNUP,
        auth,
        body([ 'userName','emailId', 'password'],
        STRINGS.PLEASE_SEND_THE_VALID_REQUEST_KEY_NOT_FOUND).exists(), (req,res)=>{
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                  return res.status(400).json(getErrorModel(errors.array()));
                }
                signUpProvider.signup(function(err,response){
                            res.send(response)
                }, req.body)
            })

}

exports.SignUpService = SignUpService;