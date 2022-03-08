const { dbConnection } = require("../../../database");
const { STRINGS } = require("../../utils/Strings");
const { getSuccessModel, getErrorModel,getTokenKey } = require("../../utils/Utils");
const jwt = require('jsonwebtoken');

var LoginServiceProvider = function () {

    this.login = function (callback, body) {
        console.log("body =>>>>", body)
        let userRef = dbConnection.collection("Users");
        userRef
        .where("emailId","==",body.emailId)
        .where("password","==",body.password)
        .get()
        .then((querySnapshot)=>{
            let result=[];
            querySnapshot.forEach((document) => {
                result.push(document.data());
            });
            if(result.length>0){
                const token = jwt.sign({id:result[0].email},getTokenKey());
            let successModel=getSuccessModel();
            successModel.data=result;
            successModel.message=STRINGS.LOGIN_IN_SUCCESSFULL;
            successModel.token=token;
            callback(null,successModel);
            }else{
                let errorModel=getErrorModel();
                errorModel.message=STRINGS.LOGIN_FAILURE;
                callback(null,errorModel);
            }
        })
            .catch(error => {
                console.log("Invalid User");
                let errorModel=getErrorModel();
                errorModel.message=STRINGS.LOGIN_FAILURE;
                callback(null,errorModel);
            }
            )
    }

}

exports.LoginServiceProvider = LoginServiceProvider;
