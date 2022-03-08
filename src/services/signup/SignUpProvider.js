var getSuccessModel = require("../../utils/Utils").getSuccessModel;
var getErrorModel = require("../../utils/Utils").getErrorModel;
var dbConnection = require('../../../database').dbConnection;
const { STRINGS } = require("../../utils/Strings");



var SignUpProvider = function () {

    this.signup = function (callback, body) {
        console.log(body)
        const data={
            userName:body.userName,
            emailId:body.emailId,
            password:body.password
        };

        let userRef = dbConnection.collection("Users");
        userRef
            .where("emailId", "==", body.emailId)
            .get()
            .then((querySnapshot) => {
                let result = [];
                querySnapshot.forEach((document) => {
                    result.push(document.data());
                });
                if (!result.length > 0) {
                    console.log("newuser=>>>",body.emailId)
                    userRef.doc().set(data)
                        .then((response) => {
                            console.log("response=>>>>", response);
                            let successModel = getSuccessModel();
                            successModel.message = STRINGS.USER_DETAILS_ADDED_SUCCESSFULLY;
                            callback(null, successModel)
                        })
                }
                else {
                    let errorModel = getErrorModel();
                    errorModel.message = STRINGS.ACCOUNT_ALREADY_EXISTS;
                    callback(null, errorModel);
                }
            }).catch(error => {
                let errorModel = getErrorModel();
                errorModel.message = STRINGS.PLEASE_TRY_AFTER_SOMETIME;
                callback(null, errorModel);
            })
    }

}

exports.SignUpProvider = SignUpProvider;