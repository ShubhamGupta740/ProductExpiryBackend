var getSuccessModel = require("../../utils/Utils").getSuccessModel;
var getErrorModel = require("../../utils/Utils").getErrorModel;
const { dbConnection } = require("../../../database");
const { STRINGS } = require("../../utils/Strings");

var AddProductProvider = function () {

    this.addProduct = function (callback, body) {
        console.log("body=>>>", body);
        //let expiryDate=new Date(body.expiryDate);
        let productRef = dbConnection.collection("productList");
        const data={
            emailId:body.emailId,
            productName:body.productName,
            productType:body.productType,
            expiryDate:body.expiryDate,
            purchaseDate:body.purchaseDate
        };
        productRef.doc().set(data)
            .then((response) => {
                console.log("response==>", response);
                let successModel = getSuccessModel();
                successModel.message = STRINGS.PRODUCT_DETAILS_ADDED_SUCCESSFULLY;
                callback(null, successModel)
            })
    }

    this.getProduct = function (callback, body) {
      console.log("body=>>>", body);
      let productRef = dbConnection.collection("productList");
      productRef.where("emailId", "==", body.emailId).get().then((querySnapshot) => {
        let result = [];
        querySnapshot.forEach((document) => {
          result.push(document.data());
        });
        if (result.length > 0) {
            let successModel=getSuccessModel();
            successModel.data=result;
            successModel.message=STRINGS.DETAILS_FETCHED_SUCCESSFULLY;
            callback(null,successModel);
        }
        else{
            let errorModel=getErrorModel();
            errorModel.message=STRINGS.NO_RECORDS_AVAILABLE;
            callback(null,errorModel);
        }
      }).catch(error=>{
        let errorModel=getErrorModel();
        errorModel.message=STRINGS.PLEASE_TRY_AFTER_SOMETIME;
        callback(null,errorModel);
      })
    };
}

exports.AddProductProvider=AddProductProvider;