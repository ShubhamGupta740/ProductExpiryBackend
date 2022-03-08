var getSuccessModel = require("../../utils/Utils").getSuccessModel;
var getErrorModel = require("../../utils/Utils").getErrorModel;
var dbConnection = require('../../../database').dbConnection;

var UpdateFBTokenProvider = function(){
    this.updateToken=function(callback,body){
        console.log("body=>>>",body);
        let userRef = dbConnection.collection("Users");
        userRef.where("emailId","==",body.emailId).get().then(querySnapshot=>{
            const user=querySnapshot.docs[0];
            console.log(user);
            let temp=user.data();
            temp.fbToken=body.token;
            console.log(temp);
            user.ref.update(temp);

            let successModel = getSuccessModel();
                            successModel.message = "Token Updated Successfully";
                            callback(null, successModel)
        }).catch(error=>{
            let errorModel = getErrorModel();
                    errorModel.message = "Token not updated";
                    callback(null, errorModel);
        })
    }
}

exports.UpdateFBTokenProvider=UpdateFBTokenProvider;